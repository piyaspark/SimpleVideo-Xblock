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