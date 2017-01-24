var postsData = require('../../../data/posts-data.js')

Page({
    onLoad:function(option){  
        var postId = option.id;
        var postData = postsData.postList[postId];
        this.setData({ 
            postData : postData
        })
        wx.setStorageSync('key', {
            game:"风暴英雄",
            developer:"暴雪"
        })
    }, 
    onCollectionTap:function(event){
        var game = wx.getStorageSync('key')
    },
    onShareTap:function(event){
        wx.clearStorageSync();
    }


}) 