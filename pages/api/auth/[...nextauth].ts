import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/utils/dbConnect";
import Employee from "@/model/employeeModel";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        empId: {
          label: "Employee Id",
          type: "text",
          placeholder: "11111111111",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        await dbConnect();

        const emp = await Employee.findOne({
          empId: credentials.empId,
        });

        if (emp == null) {
          return null;
        } else {
          return {
            id: emp._id,
            name: emp.name,
          };
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.SECRET,
  },
});
