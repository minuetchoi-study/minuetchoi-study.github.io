---
layout: post
title: "[Aloha Language House]-여행영어(세관신고)"
date: 2022-06-14 10:00:00 +0900
category: english
---

<div class="video-container">
    <video id="player" class="video-js vjs-default-skin vjs-big-play-centered" data-json="/public/json/Aloha Language House-여행영어(세관신고).json"></video>
</div>

| --- | --- | --- |

Do you have anything to declare?
No, I don't.
Yes, I do.
I have on carton of cigarettes.
What's in your bag?
Just my personal belongings.
Could you open your bag for me?
What is this?
It's Korean food for my friend.
Do I need to declare this?
Where is the tourist information desk?
A subway route map, please.
Is there a vending machine?
Where is the nearest money exchange counter?
Where can I get tickets?
Where can I get a subway?
Is there an airport bus to the city?
Is there a bus or subway to central park?
There is a subway.
Is there any other way to go besides the subway?
Could you tell me where the bus stop is?
How do I get to the city hall?


{: #conversation }

{% capture c %}
  [![](/public/icon/sorting-order-button.png){: width="20" height="20"}](#){: #allListen .btn .btn--inverse}
  <select id="playbackspeed">
    <option value="2.0">속도+2</option>
    <option value="1.5">속도+1</option>
    <option value="1.0" selected>속도0</option>
    <option value="0.75">속도-1</option>
    <option value="0.5">속도-2</option>
  </select>
  [![](/public/icon/reset-button.png){: width="20" height="20"}](#){: #reset .btn .btn--inverse}
  <select id="ringsToPlay">
    <option value="1">횟수01회</option>
    <option value="2">횟수02회</option>
    <option value="3">횟수03회</option>
    <option value="4">횟수04회</option>
    <option value="5">횟수05회</option>
    <option value="7">횟수07회</option>
    <option value="10">횟수10회</option>
  </select>
  [![](/public/icon/repeat-button.png){: width="20" height="20"}](#){: #infListen data-addminutes="60" .btn .btn--inverse}
{% endcapture %}

{% capture d %}
[![](/public/icon/open-popup-button.png){: width="25" height="25"}](#){: #guidePopup .btn .btn--inverse}
{% endcapture %}

<div class="bottom-bar">
  <div class="bottom-bar1"></div>
  <div class="bottom-bar2">{{ c | markdownify | remove: "<p>" | remove: "</p>"}}</div>
  <div class="bottom-bar3">{{ d | markdownify | remove: "<p>" | remove: "</p>"}}</div>
</div>