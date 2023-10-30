import { connect } from "@/dbConfig/dbConfig.js";
import User from "@/models/userModel.js";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    if (email === "" || username === "" || password === "") {
      return NextResponse.json({
        msg: "Please provide the required information!",
      }, { status: 400 }); // Set an appropriate status code
    }

    const findingUser = await User.findOne({ email });
    if (!findingUser) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      console.log(savedUser);

      return NextResponse.json({
        msg: "User created successfully",
        savedUser,
      });
    } else {
      return NextResponse.json({
        msg: "User already exists!",
      }, { status: 400 }); // Set an appropriate status code
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not send data: " + error }, { status: 500 });
  }
}
