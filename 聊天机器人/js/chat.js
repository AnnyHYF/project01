$(function () {
  // 初始化右侧滚动条
  // 这个方法定义在scroll.js中
  resetui()

  // 为发送按钮绑定鼠标点击事件
  $('#btnSend').on('click', function () {
    var text = $('#ipt')
      .val()
      .trim()
    if (text.length <= 0) {
      return $('#ipt').val('')
    }
    // 如果用户输入了聊天内容，则将聊天内容追加到页面上显示
    $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>')
    $('#ipt').val('')
    // 重置滚动条的位置
    resetui()
    // 发起请求，获取聊天内容
    getMsg(text)
  })

  // 获取聊天机器人发送回来的消息
  function getMsg(text) {
    $.ajax({
      method: 'GET',
      url: ' http://www.liulongbin.top:3006/api/robot',
      data: {
        spoken: text
      },
      success: function (res) {
        // console.log(res)
        if (res.message === 'success') {
          // 接收聊天消息
          var msg = res.data.info.text
          $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>')
          // 重置滚动条的位置
          resetui()
          // 调用 getVoice 函数，把文本转化为语音
          getVoice(msg)
        }
      }
    })
  }

  // 把文字转化为语音进行播放
  function getVoice(text) {
    $.ajax({
      method: 'GET',
      url: ' http://www.liulongbin.top:3006/api/synthesize',
      data: {
        text: text
      },
      success: function (res) {
        // console.log(res)
        if (res.status === 200) {
          // 播放语音
          $('#voice').attr('src', res.voiceUrl)
        }
      }
    })
  }

  // 为文本框绑定 keyup 事件
  $('#ipt').on('keyup', function (e) {
    // console.log(e.keyCode)
    if (e.keyCode === 13) {
      // console.log('用户弹起了回车键')
      $('#btnSend').click()
    }
  })
})


















// // 练习
// $(function () {
//   // 初始化滚动条
//   resetui();
//   $('#btnSend').on('click', function () {
//     // 拿到用户输入的内容
//     var text = $('#ipt').val().trim();
//     if (text.length <= 0) {
//       // 清空输入框
//       return $('#ipt').val('');
//     }
//     // 如果用户输入的不为空，那么就将用户输入的内容追加到聊天框
//     $('.talk_list').append(`
//       <li class="right_word">
//         <img src="img/person02.png" /> <span>${text}</span>
//       </li>
//     `);
//     // 清空
//     $('#ipt').val('');
//     // 初始化滚动条
//     resetui();

//     // 向服务器请求数据
//     getMsg(text);
//   });



// // 发起请求获取聊天信息
// function getMsg(text) {
//   $.ajax({
//     method: 'get',
//     url: 'http://www.liulongbin.top:3006/api/robot',
//     data: {
//       spoken: text
//     },
//     success: function (res) {
//       if (res.message === 'success') {
//         // 请求成功之后获取服务器传回来的信息
//         var robotMsg = res.data.info.text;
//          console.log(robotMsg);
//         // 将传回来的信息渲染到聊天框中
//         $('.talk_list').append(`
//             <li class="left_word">
//               <img src="img/person02.png" /> <span>${robotMsg}</span>
//             </li>
//         `);
//         // 将消息转化为语音
//         getVoice(robotMsg);
//         resetui();
//       }
//       else{
//         alert('请求失败！');
//       }
//     },
//   });
// }




// // 将该机器人的聊天内容转换为语音
// function getVoice(text1){
//   $.ajax({
//     mehod:'get',
//     url:'http://www.liulongbin.top:3006/api/synthesize',
//     data:{
//       text:text1
//     },
//     success:function(res){
//       if (res.status===200) {
//         $('#voice').attr('src',res.voiceUrl);
//       }
//     }
//   })
// }


// $('#ipt').on('keyup', function (e) {
//   // console.log(e.keyCode)
//   if (e.keyCode === 13) {
//     // console.log('用户弹起了回车键')
//     $('#btnSend').click()
//   }
// })


// });

