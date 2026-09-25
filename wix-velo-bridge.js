/**
 * ============================================================================
 * EPICUREAN FLOW — WIX VELO PAGE BRIDGE (Wix Studio & Wix Editor)
 * ============================================================================
 * Paste this snippet into your Wix Studio / Wix Editor Page Code (Velo).
 * It connects your live Wix Stores ("Stores/Products"), Wix Members,
 * Wix CRM Contacts, and Checkout directly to your Epicurean Flow frontend embed
 * ($w('#htmlComponent')).
 *
 * WHAT THIS BRIDGE POWERS:
 * 1. LIVE WIX STORES SYNC: Sends active products/collections into the embed.
 * 2. WIX DASHBOARD CONTACTS & MEMBERS TRACKING: When a visitor signs up
 *    via Google, Facebook, or Email in Epicurean Flow, their details (name,
 *    email, registration date) are automatically submitted to the Wix CRM
 *    Contacts & Site Members Dashboard. Chef Eliane can track new members,
 *    track existing members, and filter customers who made a purchase.
 * 3. NATIVE WIX MEMBER LOGIN SYNC: Automatically detects when a user is logged
 *    into Wix and passes their profile/avatar into Epicurean Flow.
 * 4. VERIFIED REVIEWS & BLOG COMMENTS: Receives member reviews and recipe
 *    discussion comments to store in Wix collections ('Reviews', 'Comments').
 * 5. SEAMLESS CHECKOUT NAVIGATION: Routes cart checkout directly to Wix's
 *    secure hosted payment gateway (/cart-page).
 * ============================================================================
 */

import wixData from 'wix-data';
import wixLocation from 'wix-location';
import { currentMember, authentication } from 'wix-members-frontend';
import { contacts } from 'wix-crm-frontend';
import { cart } from 'wix-stores-frontend';

$w.onReady(async function () {
  console.log('[Epicurean Flow] Wix Velo Bridge initializing...');

  // --------------------------------------------------------------------------
  // 1. SYNC ACTIVE PRODUCTS FROM WIX STORES
  // --------------------------------------------------------------------------
  try {
    const queryResults = await wixData.query('Stores/Products')
      .eq('visible', true)
      .include('collections')
      .limit(50)
      .find();

    if (queryResults.items && queryResults.items.length > 0) {
      $w('#htmlComponent').postMessage({
        type: 'SYNC_WIX_PRODUCTS',
        items: queryResults.items
      });
      console.log('[Epicurean Flow] Synced ' + queryResults.items.length + ' products to embed.');
    }
  } catch (err) {
    console.warn('[Epicurean Flow] Wix Stores catalog note:', err);
  }

  // --------------------------------------------------------------------------
  // 2. DETECT & SYNC CURRENT WIX LOGGED-IN MEMBER
  // --------------------------------------------------------------------------
  try {
    const member = await currentMember.getMember({ fieldsets: ['FULL'] });
    if (member) {
      $w('#htmlComponent').postMessage({
        type: 'SYNC_WIX_MEMBER',
        member: {
          id: member._id,
          name: member.profile ? (member.profile.nickname || member.contactDetails.firstName) : 'Member',
          email: member.loginEmail || '',
          picture: member.profile && member.profile.profilePhoto ? member.profile.profilePhoto.url : ''
        }
      });
      console.log('[Epicurean Flow] Sent authenticated Wix member to embed:', member.loginEmail);
    }
  } catch (err) {
    // Visitor is currently a guest / not logged in yet
  }

  // Listen for native Wix Member login events
  try {
    authentication.onLogin(async (member) => {
      console.log('[Epicurean Flow] Native Wix login detected for:', member);
      $w('#htmlComponent').postMessage({
        type: 'WIX_MEMBER_LOGGED_IN',
        member: {
          id: member._id,
          name: member.profile ? (member.profile.nickname || member.contactDetails.firstName) : 'Member',
          email: member.loginEmail || '',
          picture: member.profile && member.profile.profilePhoto ? member.profile.profilePhoto.url : ''
        }
      });
    });
  } catch (err) {}

  // --------------------------------------------------------------------------
  // 3. LISTEN FOR EVENTS TRANSMITTED FROM EPICUREAN FLOW EMBED
  // --------------------------------------------------------------------------
  $w('#htmlComponent').onMessage(async (event) => {
    if (!event.data || typeof event.data !== 'object') return;
    const data = event.data;

    // A. CHECKOUT NAVIGATION & CART SYNC
    if (data.type === 'NAVIGATE_CHECKOUT' || data.type === 'GO_TO_CART') {
      console.log('[Epicurean Flow] Processing checkout with items:', data.items ? data.items.length : 0);
      try {
        if (data.items && Array.isArray(data.items) && data.items.length > 0 && cart && cart.addProducts) {
          const prodsToAdd = [];
          for (const it of data.items) {
            if (it.wixId) {
              prodsToAdd.push({ productId: it.wixId, quantity: 1 });
            }
          }
          if (prodsToAdd.length > 0) {
            await cart.addProducts(prodsToAdd);
            console.log('[Epicurean Flow] Successfully added products to native Wix cart:', prodsToAdd.length);
          }
        }
      } catch (addErr) {
        console.warn('[Epicurean Flow] Notice adding items to Wix cart:', addErr);
      }
      wixLocation.to('/cart-page');
      return;
    }

    // B. NEW MEMBER REGISTRATION — SUBMITS TO WIX CRM DASHBOARD
    // Makes the member's email, name, and signup status appear in Wix Dashboard!
    if (data.type === 'MEMBER_REGISTERED' && data.member) {
      console.log('[Epicurean Flow] Registering contact in Wix Dashboard CRM:', data.member.email);
      try {
        const contactInfo = {
          name: {
            first: data.member.firstName || data.member.name.split(' ')[0] || 'Member',
            last: data.member.lastName || data.member.name.split(' ').slice(1).join(' ') || ''
          },
          emails: [{
            email: data.member.email,
            primary: true,
            tag: 'MAIN'
          }]
        };

        const contactOptions = {
          allowDuplicates: false,
          suppressAuth: true
        };

        // Create contact record in Wix Contacts CRM
        if (contacts && contacts.appendOrCreateContact) {
          await contacts.appendOrCreateContact(contactInfo, contactOptions);
          console.log('[Epicurean Flow] Contact successfully added to Wix Dashboard CRM!');
        }
      } catch (crmErr) {
        console.warn('[Epicurean Flow] Wix CRM Contact notice:', crmErr);
      }
      return;
    }

    // C. PROMPT NATIVE WIX LOGIN (IF TRIGGERED)
    if (data.type === 'WIX_PROMPT_LOGIN') {
      try {
        authentication.promptLogin({ mode: 'login' });
      } catch (authErr) {
        console.warn('[Epicurean Flow] Wix promptLogin note:', authErr);
      }
      return;
    }

    // D. NEW VERIFIED CUSTOMER REVIEW
    if (data.type === 'NEW_MEMBER_REVIEW' && data.review) {
      console.log('[Epicurean Flow] Received new member review:', data.review);
      try {
        // Automatically save to Wix Data 'Reviews' collection if it exists
        await wixData.insert('Reviews', {
          productTitle: data.review.productTitle,
          productId: data.review.productId,
          authorName: data.review.authorName,
          rating: data.review.rating,
          headline: data.review.title,
          feedback: data.review.body,
          submittedDate: new Date(),
          verifiedBuyer: true
        });
        console.log('[Epicurean Flow] Review saved to Wix database collection.');
      } catch (dbErr) {
        console.log('[Epicurean Flow] (Optional) Create a "Reviews" collection in Wix CMS to persist reviews in database.');
      }
      return;
    }

    // E. NEW RECIPE DISCUSSION COMMENT
    if (data.type === 'NEW_RECIPE_COMMENT' && data.comment) {
      console.log('[Epicurean Flow] Received recipe discussion comment:', data.comment);
      try {
        // Automatically save to Wix Data 'Comments' collection if it exists
        await wixData.insert('Comments', {
          recipeId: data.comment.recipeId,
          authorName: data.comment.authorName,
          commentText: data.comment.text,
          submittedDate: new Date()
        });
        console.log('[Epicurean Flow] Comment saved to Wix database collection.');
      } catch (dbErr) {
        console.log('[Epicurean Flow] (Optional) Create a "Comments" collection in Wix CMS to persist comments in database.');
      }
      return;
    }
  });

});
