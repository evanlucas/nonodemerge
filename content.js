'use strict'

var injection = require('github-injection')

injection(global, function() {
  var ele = document.querySelector('.js-merge-branch-action')
  if (ele) {
    ele.classList.add('disabled')
    ele.setAttribute('disabled', 'disabled')
    ele.style.display = 'none'
  }

  var lis = document.querySelectorAll('li.commit')

  if (!lis || !lis.length) return

  for (var i = 0; i < lis.length; i++) {
    var li = lis[i]

    var tlCell = li.children[1]

    var a = tlCell.children[0].children[0]

    var title = a.innerText

    if (title.length > 50) {
      a.style.color = '#db2c38'
    }
  }
})
