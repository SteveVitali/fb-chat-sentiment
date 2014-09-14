
function getSpinnerOptions(){
    return {
        lines: 13, // The number of lines to draw
        length: 20, // The length of each line
        width: 10, // The line thickness
        radius: 30, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#000', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent
        left: '50%' // Left position relative to parent
    };
}

function createSpinner(tar) {
    var opts = getSpinnerOptions();
    
    console.log('spinner target', tar);
    var target = tar || document.getElementById('body');
    if (spinner) {
        spinner.stop();
    }
    spinner = new Spinner(opts).spin(target);
}

function formatDate(date) {
    if (!(typeof date == 'Date')) {
        date = new Date(date);
    }
    return date.getMonth()+1 + ' - '+date.getDate()+' - '+date.getFullYear();
}
