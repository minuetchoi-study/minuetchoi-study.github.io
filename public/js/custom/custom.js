$(document).ready(function () {

    // 영상 strt
    var $video = $('video');

    if ($video.length > 0) {

        $.ajax({
            type: "GET",
            url: $video.data('json'),
            cache: false,
            datatype: "JSON",
            success: function (arr) {
                var player = videojs('player', {
                    autoplay: true,
                    loop: true,
                    muted: true,
                    preload: true,
                    controls: true
                });
                player.playlist(shuffle(arr));
                player.playlist.autoadvance(0);
                player.playlist.repeat(true);
            },
            error: function (xhr, status, error) {
                console.log("ERROR!!!");
            }
        });
    }
    // --영상 end

closeNav()
    // 북마크 strt
    $('.bookmark').magnificPopup({
        type:'iframe',
        iframe: {
            markup: '<meta name="viewport" content="width=device-width; initial-scale=1.0, user-scalable=no">' +
                    '<style>.mfp-iframe-holder .mfp-content {max-width: 100%;height:100%}</style>'+
                    '<div class="mfp-iframe-scaler" >'+
                    '<div class="mfp-close"></div>'+
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                    '</div></div>' +
                    '<script>closeNav()</script>'
        }
    });
    // --북마크 end

    $("abbr[title]").click(function() {
        $(this).hasClass("on") ? $(this).removeClass("on") : $(this).addClass("on");
    });


    $('.lbsize').find('img').css('width', '100px');
    $('.lbsize').find('img').css('height', '100px');

    var youtubeEmbedUrl = 'https://www.youtube-nocookie.com/embed/';
    var audio = [];
    var ringsToPlay = 0;
    var repeat = 0;
    var num;
    var q = 0;
    var tocMenu = [];

    $('a img').css('textDecoration','none')
    $('#footer').hide();
    $('#vocabulary').hide();

    tocMenu.push('<ul class="toc__menu">');
    $('#conversation').prepend('<colgroup><col width="4px;" /><col width="*" /><col width="40px;" /></colgroup>');
    $('#conversation').find('tr').each(function (index, element) {
        var textTd = $.trim($(element).find('td:eq(0)').html());
        var title = $.trim($(element).find('td:eq(1)').html());
        if (/\d+/.test(textTd)) {
            $(element).empty();
            $(element).append('<td style="padding: 0px; background-color: #ee5f5b;" id=-' + textTd +'></td>');
            $(element).append('<td colspan="2" style="background-color: #fffef3"><i>' + title +'</i></td>');

            tocMenu.push('<li><a href="#-' + textTd + '">' + title + '</a></li>');
            q++;
        } else {
            var $a = $(element).find('a');
            $(element).find('td:eq(0)').css('padding', '0px')
            $(element).find('td:eq(2)').addClass('playTd');
            $(element).find('td:eq(3)').addClass('youtubeTd');
            $(element).find('td:eq(3)').css('padding', '5px');

            if ($a.length > 0) {
                if (index !== 0) {
                    q++;
                }
                num = q.toString().lpad(5, 0);
                $(element).prop('id', 'tr'+ num);
            } else {
                num = q.toString().lpad(5, 0);
                $(element).prop('id', 'tr'+ num + '-' + index);
            }
        }
    });
    tocMenu.push('</ul>');
    $('.toc').append(tocMenu.join(''));

    $('.youtubeTd').hide();
    $('a[id*=play-pause-button]').each(function (index, element) {
        audio[index] = new Audio($(element).data('url'));
        $(element).click(function (e, p) {
            e.preventDefault();
            var audioSize = audio.length - 1;
            var trSize = $(this).closest('tbody').find('tr').length;
            var type;
            var no;
            var endTimestamp;
            if (typeof p === 'undefined') {
                type = '';
                no = index;
            } else {
                type = p.type;
                no = p.no;
                endTimestamp = p.endTimestamp;
            }
            no = Number(no);
            if (type === '') {
                $('#allListen').html('<img src="/public/icon/sorting-order-button.png" alt="" width="20" height="20" style="text-decoration: none;">');
                $('#allListen').removeClass('btn--danger');
                $('#allListen').addClass('btn--inverse');

                $('#infListen').html('<img src="/public/icon/repeat-button.png" alt="" width="20" height="20" style="text-decoration: none;">');
                $('#infListen').removeClass('btn--warning');
                $('#infListen').addClass('btn--inverse');
            }
            if (repeat === 0) {
                ringsToPlay = Number($('#ringsToPlay').val()) - 1;
            }
            for (var i = 0; i <= audioSize; i++) {
                if (i === no) {
                    continue;
                } else {
                    $('a[id*=play-pause-button]').eq(i).removeClass('fa-pause');
                    $('a[id*=play-pause-button]').eq(i).addClass('fa-play');
                    var trId = $('a[id*=play-pause-button]').eq(i).closest('tr').prop('id');
                    $('tr[id*=' + trId +']').css('background-color', '');
                    audio[i].currentTime = 0;
                    audio[i].pause();
                }
            }
            if($(this).hasClass('fa-play')) {
                $(this).removeClass('fa-play');
                $(this).addClass('fa-pause');
                var trId = $(this).closest('tr').prop('id');
                $('tr[id*=' + trId +']').css('background-color', '#fde1b4');
                if (type !== '') {
                    var offset = $(this).offset();
                    $('html, body').animate({scrollTop : offset.top - 100}, 400, function () {
                        if ($('#guidePopup').find('img').attr('src') == '/public/icon/open-popup-button.png') {
                            setTimeout(function () {
                                var reTitle = '';
                                $('tr[id*=' + trId +']').find('td:eq(1)').each(function (index, element) {
                                    if (index !== 0) {
                                        reTitle += '<br />';
                                    }
                                    reTitle += $(element).html();
                                });
                                var magnificTitl = {};
                                magnificTitl.src = '<div class="white-popup">' + reTitle +'<button title="Close (Esc)" type="button" class="mfp-close">×</button></div>';
                                magnificTitl.type = 'inline';
                                $('#dummy_popup').magnificPopup({
                                    items: magnificTitl,
                                    closeBtnInside: false,
                                    preloader: true,
                                    removalDelay: 160,
                                    mainClass: 'mfp-fade',
                                    callbacks: {
                                        open: function() {
                                            $('.mfp-content').find('abbr[title]').click(function() {
                                                $(this).hasClass("on") ? $(this).removeClass("on") : $(this).addClass("on");
                                            });
                                        }
                                    }
                                });
                                $('#dummy_popup').trigger('click');
                                audio[no].playbackRate = $('#playbackspeed').val();
                                audio[no].play();
                            }, 400);
                        } else {
                            setTimeout(function () {
                                audio[no].playbackRate = $('#playbackspeed').val();
                                audio[no].play();
                            }, 400);
                        }
                    });
                }
                if ($('#guidePopup').find('img').attr('src') == '/public/icon/open-popup-button.png') {
                    setTimeout(function () {
                        var reTitle = '';
                        $('tr[id*=' + trId +']').find('td:eq(1)').each(function (index, element) {
                            if (index !== 0) {
                                reTitle += '<br />';
                            }
                            reTitle += $(element).html();
                        });
                        var magnificTitl = {};
                        magnificTitl.src = '<div class="white-popup">' + reTitle +'<button title="Close (Esc)" type="button" class="mfp-close">×</button></div>';
                        magnificTitl.type = 'inline';
                        $('#dummy_popup').magnificPopup({
                            items: magnificTitl,
                            closeBtnInside: false,
                            preloader: true,
                            removalDelay: 160,
                            mainClass: 'mfp-fade',
                            callbacks: {
                                open: function() {
                                    $('.mfp-content').find('abbr[title]').click(function() {
                                        $(this).hasClass("on") ? $(this).removeClass("on") : $(this).addClass("on");
                                    });
                                }
                            }
                        });
                        $('#dummy_popup').trigger('click');
                        audio[no].playbackRate = $('#playbackspeed').val();
                        audio[no].play();
                    }, 400);
                } else {
                    setTimeout(function () {
                        audio[no].playbackRate = $('#playbackspeed').val();
                        audio[no].play();
                    }, 400);
                }
            } else {
                $(this).removeClass('fa-pause');
                $(this).addClass('fa-play');
                var trId = $(this).closest('tr').prop('id');
                $('tr[id*=' + trId +']').css('background-color', '');
                $('.mfp-close').trigger('click');
                audio[no].currentTime = 0;
                audio[no].pause();
            }
            audio[no].onended = function() {
                $('a[id*=play-pause-button]').removeClass('fa-pause');
                $('a[id*=play-pause-button]').addClass('fa-play');
                var trId = $('a[id*=play-pause-button]').eq(no).closest('tr').prop('id');
                $('tr[id*=' + trId +']').css('background-color', '');
                if ($('#guidePopup').find('img').attr('src') == '/public/icon/open-popup-button.png') {
                    $('.mfp-close').trigger('click');
                }
                var map = {};
                if (ringsToPlay === 0) {
                    repeat = 0;
                    if (type === 'allListen') {

                        if (no < audioSize) {
                            map.no = no + 1;
                            map.type = 'allListen';
                            $('a[id*=play-pause-button]').eq(map.no).trigger('click', map);
                        } else {
                            $('#allListen').html('<img src="/public/icon/sorting-order-button.png" alt="" width="20" height="20" style="text-decoration: none;">');
                            $('#allListen').removeClass('btn--danger');
                            $('#allListen').addClass('btn--inverse');
                            var offset = $('.page__content').offset();
                            $('html, body').animate({scrollTop : offset.top}, 400);
                        }
                    } else if (type === 'infListen') {
                        var date = new Date();
                        var startTimestamp = date.setMinutes(date.getMinutes());
                        if (startTimestamp < endTimestamp) {
                            var map = {};
                            map.no = Math.floor(Math.random() * (audioSize - 0 + 1)) + 0;
                            map.type = 'infListen';
                            map.endTimestamp = endTimestamp;
                            $('a[id*=play-pause-button]').eq(map.no).trigger('click', map);
                        } else {
                            $('#infListen').html('<img src="/public/icon/repeat-button.png" alt="" width="20" height="20" style="text-decoration: none;">');
                            $('#infListen').removeClass('btn--warning');
                            $('#infListen').addClass('btn--inverse');
                            var offset = $('.page__content').offset();
                            $('html, body').animate({scrollTop : offset.top}, 400);
                        }
                    }
                } else {
                    ringsToPlay--;
                    repeat = 1;
                    if (type !== '') {
                        map.no = no;
                        map.type = type;
                        map.endTimestamp = endTimestamp;
                        $('a[id*=play-pause-button]').eq(map.no).trigger('click', map);
                    } else {
                        $('a[id*=play-pause-button]').eq(no).trigger('click');
                    }

                }
            };
        });
    });
    $('a[id*=infListen]').click(function (e) {
        e.preventDefault();
        $('#allListen').html('<img src="/public/icon/sorting-order-button.png" alt="" width="20" height="20" style="text-decoration: none;">');
        $('#allListen').removeClass('btn--danger');
        $('#allListen').addClass('btn--inverse');

        if (audio !== null) {
            for (var i = 0; i < audio.length; i++) {
                $('a[id*=play-pause-button]').eq(i).removeClass('fa-pause');
                $('a[id*=play-pause-button]').eq(i).addClass('fa-play');
                var trId = $('a[id*=play-pause-button]').eq(i).closest('tr').prop('id');
                $('tr[id*=' + trId +']').css('background-color', '');
                audio[i].currentTime = 0;
                audio[i].pause();
            }
            if ($(this).hasClass('btn--inverse')) {
                $(this).html('<img src="/public/icon/stop-button.png" alt="" width="20" height="20" style="text-decoration: none;">');
                $(this).removeClass('btn--inverse');
                $(this).addClass('btn--warning');

                var audioSize = audio.length - 1;
                var no = Math.floor(Math.random() * (audioSize - 0 + 1)) + 0;
                var addMinutes = Number($(this).data('addminutes'));
                var date = new Date();
                var endTimestamp = date.setMinutes(date.getMinutes() + addMinutes);

                var map = {};
                map.no = no;
                map.type = 'infListen';
                map.endTimestamp = endTimestamp;
                $('a[id*=play-pause-button]').eq(no).trigger('click', map);
            } else {
                $(this).html('<img src="/public/icon/repeat-button.png" alt="" width="20" height="20" style="text-decoration: none;">');
                $(this).removeClass('btn--warning');
                $(this).addClass('btn--inverse');
            }
        }
    });

    $('#allListen').click(function (e) {
        e.preventDefault();
        $('#infListen').html('<img src="/public/icon/repeat-button.png" alt="" width="20" height="20" style="text-decoration: none;">');
        $('#infListen').removeClass('btn--warning');
        $('#infListen').addClass('btn--inverse');

        if (audio !== null) {
            for (var i = 0; i < audio.length; i++) {
                $('a[id*=play-pause-button]').eq(i).removeClass('fa-pause');
                $('a[id*=play-pause-button]').eq(i).addClass('fa-play');
                var trId = $('a[id*=play-pause-button]').eq(i).closest('tr').prop('id');
                $('tr[id*=' + trId +']').css('background-color', '');
                audio[i].currentTime = 0;
                audio[i].pause();
            }
            if ($(this).hasClass('btn--inverse')) {
                $(this).html('<img src="/public/icon/stop-button.png" alt="" width="20" height="20" style="text-decoration: none;">');
                $(this).removeClass('btn--inverse');
                $(this).addClass('btn--danger');

                var map = {};
                map.no = 0;
                map.type = 'allListen';
                $('a[id*=play-pause-button]').eq(0).trigger('click', map);
            } else {
                $(this).html('<img src="/public/icon/sorting-order-button.png" alt="" width="20" height="20" style="text-decoration: none;">');
                $(this).removeClass('btn--danger');
                $(this).addClass('btn--inverse');
            }
        }
    });

    $('a[id*=youtube-pause-button]').each(function (index, element) {
        $(element).click(function (e) {
            e.preventDefault();
            var offset = $('.responsive-video-container').offset();
            $('html, body').animate({scrollTop : offset.top}, 400);
            var videoSeq = $(element).find('img').prop('alt');
            $('.responsive-video-container').find('iframe').prop('src', youtubeEmbedUrl + videoSeq + '?autoplay=1');
        });
    });

    $('#reset').click(function (e) {
        e.preventDefault();
        $('#playbackspeed').val('1.0');
        $('#ringsToPlay').val('1');
        if (audio !== null) {
            for (var i = 0; i < audio.length; i++) {
                $('a[id*=play-pause-button]').eq(i).removeClass('fa-pause');
                $('a[id*=play-pause-button]').eq(i).addClass('fa-play');
                var trId = $('a[id*=play-pause-button]').eq(i).closest('tr').prop('id');
                $('tr[id*=' + trId +']').css('background-color', '');

                audio[i].currentTime = 0;
                audio[i].pause();
            }
        }
        $('#infListen').html('<img src="/public/icon/repeat-button.png" alt="" width="20" height="20" style="text-decoration: none;">');
        $('#infListen').removeClass('btn--warning');
        $('#infListen').addClass('btn--inverse');
        $('#allListen').html('<img src="/public/icon/sorting-order-button.png" alt="" width="20" height="20" style="text-decoration: none;">');
        $('#allListen').removeClass('btn--danger');
        $('#allListen').addClass('btn--inverse');
        var offset = $('article').offset();
        $('html, body').animate({scrollTop : offset.top}, 400);
    });

    $('#guidePopup').click(function (e) {
        e.preventDefault();
        if ($(this).find('img').attr('src') == '/public/icon/open-popup-button.png') {
            $(this).find('img').prop('src', '/public/icon/close-popup-button.png');
        } else {
            $(this).find('img').prop('src', '/public/icon/open-popup-button.png');
        }
    });
});

// 영상 셔플
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

// 북마크
function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//

/**
 * 좌측문자열채우기
 * @params
 *  - padLen : 최대 채우고자 하는 길이
 *  - padStr : 채우고자하는 문자(char)
 */
 String.prototype.lpad = function(padLen, padStr) {
    var str = this;
    if (padStr.length > padLen) {
        return str + '';
    }
    while (str.length < padLen) {
        str = padStr + str;
    }
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
};

/**
 * 우측문자열채우기
 * @params
 *  - padLen : 최대 채우고자 하는 길이
 *  - padStr : 채우고자하는 문자(char)
 */
String.prototype.rpad = function(padLen, padStr) {
    var str = this;
    if (padStr.length > padLen) {
        return str + '';
    }
    while (str.length < padLen) {
        str += padStr;
    }
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
};

var dates = {
    convert:function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
        );
    },
    compare:function(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
    },
    inRange:function(d,start,end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
       return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    },
    dday:function(start,end) {
        var distance = end - start;//디데이에서 현재까지 뺀다.
    
        var d = Math.floor(distance / (1000 * 60 * 60 * 24));//일
    
        var h = Math.floor((distance / (1000*60*60)) % 24);//시간
        var m = Math.floor((distance / (1000*60)) % 60);//분
        var s = Math.floor((distance / 1000) % 60);//초

        if (distance <= 0) {//당일넘어섰을때, dday로 변경
            return d;
        } else {
            h = (h < 10 ? '0' + h : h);
            m = (m < 10 ? '0' + m : m);
            s = (s < 10 ? '0' + s : s);
            //return d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' (' + (h + ':' + m + ':' + s) + ')';
            return d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
}