// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


const locSet = {}; 
dayjs.locale(locSet);
$(function () {
    // Use day.js library to gett date information 
    const currHour = dayjs().format('H');

    function colorBlock() {
        $('.time-block').each(function () {
            const blockHour = parseInt(this.id);
            $(this).toggleClass('past', blockHour < currHour);
            $(this).toggleClass('present', blockHour === currHour);
            $(this).toggleClass('future', blockHour > currHour);
        });
    }

    function notesMade() {
        $('.saveBtn').on('click', function () {
            const idtarget = $(this).parent().attr('id');
            const descrip = $(this).siblings('.description').val();
            localStorage.setItem(idtarget, descrip);
        });
    }
        function colorRefresh() {
            $('.time-block').each(function () {
                const blockHour = parseInt(this.id);
                if (blockHour == currHour) {
                    $(this).removeClass('past future').addClass('present');
                }
                else if (blockHour < currHour) {
                    $(this).removeClass('future present').addClass('past');
                }
                else {
                    $(this).removeClass('past present').addClass('future');
                }
            });
        }

        $('.time-block').each(function () {
            const idtarget = $(this).attr('id');
            const descrip = localStorage.getItem(idtarget);
            $(this).children('.description').val(descrip);
        });

        function updatedTimeClock() {
            const date = $('#date');
            const time = $('#time');
            const currDate = dayjs().format('dddd, MMMM D, YYYY');
            const currTime = dayjs().format('hh:mm:ss A');
            date.text(currDate);
            time.text(currTime);

        }

        colorBlock();
        notesMade();
        colorRefresh();
        updatedTimeClock();

        setInterval(updatedTimeClock, 1000);

    
});

