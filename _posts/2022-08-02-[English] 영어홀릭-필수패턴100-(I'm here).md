---
layout: post
title: "[영어홀릭]-필수패턴100-(I'm here)"
date: 2022-03-02 10:00:00 +0900
category: english
---

<div class="video-container">
    <video id="player" class="video-js vjs-default-skin vjs-big-play-centered" data-json="/public/json/영어홀릭-필수패턴100-(I'm here).json"></video>
</div>

| --- | --- | --- |
| | I'm here to talk to you.<br /><sub>너랑 얘기하러 왔어요.</sub> | [](#){: data-url="/public/media/영어홀릭-필수패턴100-(I'm here)1.aac" #play-pause-button .fa .fa-play} |
| | I'm here to study.<br /><sub>공부하러 왔어요.</sub> | [](#){: data-url="/public/media/영어홀릭-필수패턴100-(I'm here)2.aac" #play-pause-button .fa .fa-play} |
| | I'm here to apologize.<br /><sub>사과하러 왔어요.</sub> | [](#){: data-url="/public/media/영어홀릭-필수패턴100-(I'm here)3.aac" #play-pause-button .fa .fa-play} |
| | I'm here to help you.<br /><sub>도와주러 왔어요.</sub> | [](#){: data-url="/public/media/영어홀릭-필수패턴100-(I'm here)4.aac" #play-pause-button .fa .fa-play} |
| | I'm here for my business.<br /><sub>사업때문에 왔어요.</sub> | [](#){: data-url="/public/media/영어홀릭-필수패턴100-(I'm here)5.aac" #play-pause-button .fa .fa-play} |
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