"use strict";

// So we don't have to keep re-finding things on the page, find DOM elements once:

const $body = $("body");
const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");
const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");

/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */
function hidePageComponents() {
  const components = [$allStoriesList, $loginForm, $signupForm];
  components.forEach((c) => c.hide());
}

/** Overall function to kick off the app. */
async function start() {
  console.debug("start");

  try {
    await checkForRememberedUser();
    await getAndShowStoriesOnStart();

    if (currentUser) updateUIOnUserLogin();
  } catch (error) {
    console.error("Error in starting the app:", error);
  }
}

$(start);

/** Show main list of all stories when click site name */
function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();

  try {
    putStoriesOnPage();
  } catch (error) {
    console.error("Error in showing all stories:", error);
    alert("Failed to load stories. Please try again later.");
  }
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */
function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logs in, update the navbar to reflect that. */
function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

// Remaining code for getAndShowStoriesOnStart, putStoriesOnPage, and user login/signup/login are unchanged.
