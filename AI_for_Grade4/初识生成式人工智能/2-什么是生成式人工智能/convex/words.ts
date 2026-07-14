import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// 供教师端实时获取数据
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("words").collect();
  },
});

// 供学生端发送数据
export const send = mutation({
  // 这里的参数名必须和前端一致：word 和 time
  args: { 
    word: v.string(),
    time: v.string() 
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("words", {
      word: args.word,
      time: args.time,
    });
  },
});

// 供教师端清空数据
export const clear = mutation({
  args: {},
  handler: async (ctx) => {
    const allWords = await ctx.db.query("words").collect();
    for (const word of allWords) {
      await ctx.db.delete(word._id);
    }
  },
});