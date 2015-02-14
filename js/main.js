(function(root, $) {

  "use strict";

  var scope = $('.app'),
      select = scope.find('.form-select'),
      octal = scope.find('#form-octal'),
      symbolic = scope.find('#form-symbolic'),
      submit = scope.find('#parse-submit'),
      abstract = {
        o: {
          r: false,
          w: false,
          x: false
        },
        g: {
          r: false,
          w: false,
          x: false
        },
        w: {
          r: false,
          w: false,
          x: false
        }
      };

  var updateInputs = function() {

    // Checkboxes
    for(var type in abstract) {
      if(abstract.hasOwnProperty(type)) {
        for(var perm in abstract[type]) {
          if(abstract[type].hasOwnProperty(perm)) {
            $('.form-select[value="'+type+':'+perm+'"]').prop('checked', abstract[type][perm]);
          }
        }
      }
    }
    // Octal
    var types = ['o', 'g', 'w'],
      octalVal = '0';

    for (var i = 0; i < types.length; i++) {
      var val = JSON.stringify(abstract[types[i]]);

      if (val == JSON.stringify({r: false, w: false, x: false}))
         octalVal += '0';
      if (val == JSON.stringify({r: false, w: false, x: true}))
         octalVal += '1';
      if (val == JSON.stringify({r: false, w: true, x: false}))
         octalVal += '2';
      if (val == JSON.stringify({r: false, w: true, x: true}))
         octalVal += '3';
      if (val == JSON.stringify({r: true, w: false, x: false}))
         octalVal += '4';
      if (val == JSON.stringify({r: true, w: false, x: true}))
         octalVal += '5';
      if (val == JSON.stringify({r: true, w: true, x: false}))
         octalVal += '6';
      if (val == JSON.stringify({r: true, w: true, x: true}))
         octalVal += '7';
    }

    octal.val(octalVal);

  };

  select.on('change', function() {
    var el = $(this),
        segms = el.val().split(':');

    if(el.is(':checked')) {
      abstract[segms[0]][segms[1]] = true;
    } else {
      abstract[segms[0]][segms[1]] = false;
    }

    updateInputs();
  });

  submit.on('click', function() {
    var el = octal,
        ocatalVal = el.val();
    console.log(ocatalVal);

    var types = ['o', 'g', 'w'];

    for (var i = 0; i < types.length; i++) {
      var cur = ocatalVal.charAt(i+1),
          key = types[i];

      switch(cur) {
        case '0':
          abstract[key] = {
            r: false,
            w: false,
            x: false
          };
          break;
        case '1':
          abstract[key] = {
            r: false,
            w: false,
            x: true
          };
          break;
        case '2':
          abstract[key] = {
            r: false,
            w: true,
            x: false
          };
          break;
        case '3':
          abstract[key] = {
            r: false,
            w: true,
            x: true
          };
          break;
        case '4':
          abstract[key] = {
            r: true,
            w: false,
            x: false
          };
          break;
        case '5':
          abstract[key] = {
            r: true,
            w: false,
            x: true
          };
          break;
        case '6':
          abstract[key] = {
            r: true,
            w: true,
            x: false
          };
          break;
        case '7':
          abstract[key] = {
            r: true,
            w: true,
            x: true
          };
          break;
      }
    }

    updateInputs();
  });

  symbolic.on('keypress', function() {
    var el = $(this);
        symb = el.val();


    updateInputs();
  });

})(window, jQuery);