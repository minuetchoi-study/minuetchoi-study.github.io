---
layout: post
title: "[영어홀릭]-필수패턴100-(No wonder)"
date: 2022-09-27 10:00:00 +0900
category: english
---

<div class="video-container">
    <video id="player" class="video-js vjs-default-skin vjs-big-play-centered" data-json="/public/json/영어홀릭-필수패턴100-(No wonder).json"></video>
</div>

| --- | --- | --- |
| | No wonder you're tired.<br /><sub>피곤할 만 하네.</sub> | [](#){: data-url="/public/media/영어홀릭-필수패턴100-(No wonder)1.aac" #play-pause-button .fa .fa-play} |
| | No wonder you're so angry.<br /><sub>화낼만 해.</sub> | [](#){: data-url="/public/media/영어홀릭-필수패턴100-(No wonder)2.aac" #play-pause-button .fa .fa-play} |
| | No wonder you hate it.<br /><sub>싫어할 만 하네.</sub> | [](#){: data-url="/public/media/영어홀릭-필수패턴100-(No wonder)3.aac" #play-pause-button .fa .fa-play} |
| | No wonder you like it.<br /><sub>좋아할 만 하네.</sub> | [](#){: data-url="/public/media/영어홀릭-필수패턴100-(No wonder)4.aac" #play-pause-button .fa .fa-play} |
| | No wonder you're late.<br /><sub>늦을만도 하네.</sub> | [](#){: data-url="/public/media/영어홀릭-필수패턴100-(No wonder)5.aac" #play-pause-button .fa .fa-play} |
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