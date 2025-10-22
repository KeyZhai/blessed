import { betterAuth } from "better-auth";
import { getUser, addUser } from "@/lib/redis";

export const auth = betterAuth({
  database: {
    // 使用内存存储（开发环境），生产环境请使用真实数据库
    // 如果你有 Redis 或其他数据库，可以配置适配器
    type: "sqlite",
    sqlite: {
      database: ":memory:",
    },
  },
  emailAndPassword: {
    enabled: true,
    async verifyUser(user: { email: string; password: string }) {
      // 自定义用户验证逻辑
      const result = await getUser(user.email, user.password);

      // 密码错误
      if (result === 1) {
        throw new Error("Invalid credentials");
      }

      // 用户不存在，自动注册
      if (result === 0) {
        const newUser = await addUser(user.email, user.password);
        return {
          user: {
            id: newUser.username,
            email: user.email,
            name: newUser.name,
            emailVerified: false,
          },
        };
      }

      // 验证成功
      return {
        user: {
          id: result.username,
          email: user.email,
          name: result.name,
          emailVerified: false,
        },
      };
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "",
    },
  },
  trustedOrigins: ["http://localhost:3000"],
});
