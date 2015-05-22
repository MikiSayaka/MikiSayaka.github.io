//  This is the todo list dynamic template.
var gobalTemplate = [
  '<input type="text" id="todoThing" name="todoThing" value="">',
  '<input type="button" value="Add to list">',
  '{{#collection tag="ul" id="todoUl"}}',
  '<li>',
  '<input type="checkbox" id="done{{id}}" {{#done}}checked{{/done}}>',
  '<span class="todoItemText" todoId="{{id}}">{{name}}</sapn>',
  '</li>',
  '{{/collection}}'
].join('');

jQuery(function($){
  var _getTodoList;
  var _getTodoItem;
  var _putTodoItem;
  var _changeTodoItem;
  var _view;

  //  Load the todo list.
  _getTodoList = function() {
    var _todoItem;
    $.ajax({
      url: 'http://beta.fandorashop.com/api/todos',
      dataType: 'JSON',
      async: false,
      method: 'GET'
    }).done(function(callBackData){
      _todoItem = callBackData.data
    }).error(function(e){
      alert('Okay, Huston, we\'ve had a problem here! \n We cannot get anything.');
    });
    return _todoItem;
  }

  //  Insert the todo item.
  _putTodoItem = function(_wantTodo) {
    var _todoData = {
      done: 0,
      name: _wantTodo
    };
    $.ajax({
      url: 'http://beta.fandorashop.com/api/todos',
      dataType: 'JSON',
      data: _todoData,
      method: 'POST'
    }).done(function(callBackData){
      $('#todoThing').val('');
      var _id = callBackData.data;
      $('#todoUl').prepend(
        '<li>' +
        '<input type="checkbox" id="done' + _id + '">' +
        '<span class="todoItemText" todoId="' + _id+ '">' + _wantTodo + '</sapn>' +
        '</li>'
      );
    }).error(function(e){
      alert('Okay, Huston, we\'ve had a problem here! \n We cannot insert todo item.');
    });
  }

  //  Change the todo item.
  _changeTodoItem = function(_wantTodo, _done, _todoId, _targetParentObj, _switchTag) {
    var _todoData = {
      done: _done,
      name: _wantTodo
    };
    $.ajax({
      url: 'http://beta.fandorashop.com/api/todos/' + _todoId,
      dataType: 'JSON',
      data: _todoData,
      method: 'PUT'
    }).done(function(data){
      if (_switchTag) {
        _targetParentObj.find('input[type=text]').remove();
        _targetParentObj.append('<span class="todoItemText" todoId="' + _todoId +'">' + _wantTodo + '</span>');
      }
    }).error(function(e){
      alert('Okay, Huston, we\'ve had a problem here! \n We cannot change todo item.');
    });
  }

  _view = new Thorax.View({
    collection: new Thorax.Collection(_getTodoList()),
    events: {
      'click input[type=button]': function() {
        var _wantTodo = $('#todoThing').val();
        _putTodoItem(_wantTodo);
      },
      'click span.todoItemText': function(event) {
        var _tempEl = $(event.target);
        var _tempText = _tempEl.text();
        var _tempId = _tempEl.attr('todoId');
        _tempEl.parent().find('span').remove().end()
          .append('<input type="text" value="' + _tempText + '" id="tempTodo" todoId="' + _tempId + '">');
      },
      'keydown input#todoThing': function(event) {
        var _tempText = $(event.target).val();
        if (event.keyCode == 13) {
          _putTodoItem(_tempText);
        }
      },
      'keydown input#tempTodo': function(event) {
        var _tempText = $(event.target).val();
        var _tempId = $(event.target).attr('todoId');
        var _tempDown = $(event.target).parent().find('input[type=checkbox]').prop('checked');
        if (event.keyCode == 13) {
          _tempDown = (_tempDown) ? 1 : 0;
          _changeTodoItem(_tempText, _tempDown, _tempId, $(event.target).parent(), true);
        }
      },
      'change input[type="checkbox"]': function(event) {
        var _tempDown = $(event.target).prop('checked');
        var _tempText = $(event.target).parent().find('span').text();
        var _tempId = $(event.target).parent().find('span').attr('todoId');
        _changeTodoItem(_tempText, _tempDown, _tempId, $(event.target).parent(), false);
      }
    },
    template: Handlebars.compile(gobalTemplate)
  });

  _view.appendTo('#main-container');

  Handlebars.registerViewHelper('on', function(evName, helperView) {
    return helperView.listenTo(helperView.parent, evName, function() {
      return helperView.render();
    });
  });
});
