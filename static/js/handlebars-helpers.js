Handlebars.registerHelper('commaSeparatedList', function(list, valueField, options) {
	var html = '';
	for (var i=0; i<list.length-1; i++) {
		html += list[i][valueField] + ', ';
	}
	html += list[list.length-1][valueField];
	return new Handlebars.SafeString(html);
});
