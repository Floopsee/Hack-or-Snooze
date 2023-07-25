"use strict";

// global to hold the User instance of the currently-logged-in user
let currentUser;

/** Handle login form submission. If login is ok, sets up the user instance */
async function login(evt) {
  console.debug("login", evt);
  evt.preventDefault();

  const username = $("#login-username").val();
  const password = $("#login-password").val();

  try {
    currentUser = await User.login(username, password);
    $loginForm.trigger("reset");
    saveUserCredentialsInLocalStorage();
    updateUIOnUserLogin();
  } catch (error) {
    console.error("Error during login:", error);
    alert("Login failed. Please check your username and password.");
  }
}

$loginForm.on("submit", login);

/** Handle signup form submission. */
async function signup(evt) {
  console.debug("signup", evt);
  evt.preventDefault();

  const name = $("#signup-name").val();
  const username = $("#signup-username").val();
  const password = $("#signup-password").val();

  try {
    currentUser = await User.signup(username, password, name);
    saveUserCredentialsInLocalStorage();
    updateUIOnUserLogin();
    $signupForm.trigger("reset");
  } catch (error) {
    console.error("Error during signup:", error);
    alert("Signup failed. Please try again.");
  }
}

$signupForm.on("submit", signup);

/** If there are user credentials in local storage, use those to log in
 * that user. This is meant to be called on page load, just once.
 */
async function checkForRememberedUser() {
  console.debug("checkForRememberedUser");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!token || !username) return false;

  try {
    currentUser = await User.loginViaStoredCredentials(token, username);
  } catch (error) {
    console.error("Error during checkForRememberedUser:", error);
    alert("Failed to login with remembered credentials. Please login again.");
    return false;
  }
}

/** Sync current user information to localStorage.
 *
 * We store the username/token in localStorage so when the page is refreshed
 * (or the user revisits the site later), they will still be logged in.
 */
function saveUserCredentialsInLocalStorage() {
  console.debug("saveUserCredentialsInLocalStorage");
  if (currentUser) {
    localStorage.setItem("token", currentUser.loginToken);
    localStorage.setItem("username", currentUser.username);
  }
}

/** When a user signs up or registers, we want to set up the UI for them:
 *
 * - show the stories list
 * - update nav bar options for logged-in user
 * - generate the user profile part of the page
 */
function updateUIOnUserLogin() {
  console.debug("updateUIOnUserLogin");
  $allStoriesList.show();
  updateNavOnLogin();
}

// Remaining code for hidePageComponents and updateNavOnLogin is unchanged.
