(function($){
	$(function(){
		$("#tree").fancytree({
			extensions: ["filter", 'edit'],
			filter: {
				mode: "dimm"
			},
			icons : true,
			activate: function(event, data){
			  var node = data.node;

			  // Set focus to embedded input
			  $("span.fancytree-title :input", node.span).focus();
			},
			keydown: function(event, data){
			  var KC = $.ui.keyCode;

			  if( $(event.originalEvent.target).is(":input") ){

				// When inside an input, let the control handle the keys
				data.result = "preventNav";

				// But do the tree navigation on Ctrl + NAV_KEY
				switch( event.which ){
				  case KC.LEFT:
				  case KC.RIGHT:
				  case KC.BACKSPACE:
				  case KC.SPACE:
					if( e.shiftKey ){
					  data.node.navigate(event.which);
					}
				}
			  }
			},
			edit: {
			  triggerStart: ["f2", "dblclick", "shift+click", "mac+enter"],
			  beforeEdit: function(event, data){
				// Return false to prevent edit mode
			  },
			  edit: function(event, data){
				// Editor was opened (available as data.input)
			  },
			  beforeClose: function(event, data){
				// Return false to prevent cancel/save (data.input is available)
			  },
			  save: function(event, data){
				// Save data.input.val() or return false to keep editor open
				console.log("save...", this, data);
				// Simulate to start a slow ajax request...
				setTimeout(function(){
				  $(data.node.span).removeClass("pending");
				  // Let's pretend the server returned a slightly modified
				  // title:
				  data.node.setTitle(data.node.title + "!");
				}, 2000);
				// We return true, so ext-edit will set the current user input
				// as title
				return true;
			  },
			  close: function(event, data){
				// Editor was removed
				if( data.save ) {
				  // Since we started an async request, mark the node as preliminary
				  $(data.node.span).addClass("pending");
				}
			  }
		}
		}).on('focusin', function(event){
			var node = $.ui.fancytree.getNode(event);
			if( node && !node.isActive() ){
			  node.setActive();
			}
		});
		$("#tree").fancytree("getRootNode").visit(function(node){
			node.setExpanded(true);
		});

		$("#tree").contextmenu({
		  delegate: "span.fancytree-title",
	//      menu: "#options",
		  menu: [
			  {title: "잘라내기", cmd: "cut", uiIcon: "ui-icon-scissors"},
			  {title: "복사", cmd: "copy", uiIcon: "ui-icon-copy"},
			  {title: "붙여넣기", cmd: "paste", uiIcon: "ui-icon-clipboard", disabled: false },
			  {title: "----"},
			  {title: "수정", cmd: "edit", uiIcon: "ui-icon-pencil", disabled: true },
			  {title: "삭제", cmd: "delete", uiIcon: "ui-icon-trash", disabled: true },
			  {title: "More", children: [
				{title: "Sub 1", cmd: "sub1"},
				{title: "Sub 2", cmd: "sub1"}
				]}
			  ],
		  beforeOpen: function(event, ui) {
			var node = $.ui.fancytree.getNode(ui.target);
	//                node.setFocus();
			node.setActive();
		  },
		  select: function(event, ui) {
			var node = $.ui.fancytree.getNode(ui.target);
			alert("select " + ui.cmd + " on " + node);
		  }
		});
	});
})(jQuery);