var postsData = require('../../data/posts-data.js')

Page({
  data: {

  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    // this.setData.postList = postsData.postList

    // this.setData({
    //     posts_key:postsData.postList
    // });

    this.setData({
      postList: postsData.postList
    });
  },
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },
  onSwiperTap: function (event) {
    // target和currentTarget
    // target指的是当前点击的组件，currentTarget指的是事件捕获的组件
    // target指的是image，currentTarget指的是swiper
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  }
})