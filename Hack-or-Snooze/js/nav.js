"use strict";

function navAllStories(evt) {
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

function navSubmitStoryClick(evt) {
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
}

$navSubmitStory.on("click", navSubmitStoryClick);

function navFavoritesClick(evt) {
  hidePageComponents();
  putFavoritesListOnPage();
}

$body.on("click", "#nav-favorites", navFavoritesClick);

function navMyStories(evt) {
  hidePageComponents();
  putUserStoriesOnPage();
  $ownStories.show();
}

$body.on("click", "#nav-my-stories", navMyStories);

function navLoginClick(evt) {
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
  $storiesContainer.hide();
}

$navLogin.on("click", navLoginClick);

function navProfileClick(evt) {
  hidePageComponents();
  $userProfile.show();
}

$navUserProfile.on("click", navProfileClick);

function updateNavOnLogin() {
  $(".main-nav-links").css("display", "flex");
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
