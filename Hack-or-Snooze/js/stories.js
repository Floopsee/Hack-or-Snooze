"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when the site first loads. */
async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

function generateStoryMarkup(story) {
  const hostName = story.getHostName();
  return $(`
    <li id="${story.storyId}">
      <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
      </a>
      <small class="story-hostname">(${hostName})</small>
      <small class="story-author">by ${story.author}</small>
      <small class="story-user">posted by ${story.username}</small>
    </li>
  `);
}

async function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  try {
    // Use the storyList directly instead of storyList.stories
    for (let story of storyList) {
      const $story = generateStoryMarkup(story);
      $allStoriesList.append($story);
    }

    $allStoriesList.show();
  } catch (error) {
    console.error("Error in putting stories on the page:", error);
    alert("Failed to load stories. Please try again later.");
  }
}
