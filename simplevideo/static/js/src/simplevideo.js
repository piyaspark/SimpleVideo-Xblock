/* Javascript for SimpleVideoXBlock. */
// function SimpleVideoXBlock(runtime, element) {

//     function updateCount(result) {
//         $('.count', element).text(result.count);
//     }

//     var handlerUrl = runtime.handlerUrl(element, 'increment_count');

//     $('p', element).click(function(eventObject) {
//         $.ajax({
//             type: "POST",
//             url: handlerUrl,
//             data: JSON.stringify({"hello": "world"}),
//             success: updateCount
//         });
//     });

//     $(function ($) {
//         /* Here's where you'd do things on page load. */
//     });
// }

function SimpleVideoBlock(runtime, element) {
    var iframe = $('.simplevideo iframe'),
        player = $f(iframe[0]),
        watched_status = $('.simplevideo .status .watched-count');

    function on_finish(id) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'mark_as_watched'),
            data: JSON.stringify({watched: true}),
            success: function(result) {
                watched_status.text(result.watched_count);
            }
        });
    }

    player.addEvent('ready', function() {
        player.addEvent('finish', on_finish);
    });
}

function SimpleVideoEditBlock(runtime, element) {
    $(element).find('.save-button').bind('click', function() {
      var handlerUrl = runtime.handlerUrl(element, 'studio_submit');
      var data = {
        href: $(element).find('input[name=href]').val(),
        maxwidth: $(element).find('input[name=maxwidth]').val(),
        maxheight: $(element).find('input[name=maxheight]').val()
      };
      runtime.notify('save', {state: 'start'});
      $.post(handlerUrl, JSON.stringify(data)).done(function(response) {
        runtime.notify('save', {state: 'end'});
      });
    });
  
    $(element).find('.cancel-button').bind('click', function() {
      runtime.notify('cancel', {});
    });
  }