import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/utils/models/userModel";
import { User } from "@/utils/types/user";
import { dbConnect } from "@/utils/db";
import mongoose from "mongoose";

// Hanterar GET-begäran (Hämta alla användare)
export async function GET() {
  await dbConnect();
  try {
    const users = await UserModel.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

// Hanterar POST-begäran (Skapa en ny användare)
export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { name, email, age }: User = await request.json();
    if (!name || !email || !age) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }
    const newUser = await UserModel.create({ name, email, age });
    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

// Hanterar PUT-begäran (Uppdatera en befintlig användare)
export async function PUT(request: NextRequest) {
    await dbConnect();
    try {
      const { name, email, age }: User = await request.json();
      
      if (!email) {
        return NextResponse.json(
          { message: "Email is required for updating user" },
          { status: 400 }
        );
      }
  
      const updatedUser = await UserModel.findOneAndUpdate(
        { email },
        { name, age },
        { new: true }
      );
  
      if (!updatedUser) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { message: "User updated successfully", user: updatedUser },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
  }



  // Hanterar DELETE-förfrågan (Ta bort en användare)
export async function DELETE(request: NextRequest) {
    await dbConnect();
    try {
      const { email }: { email: string } = await request.json();
      
      if (!email) {
        return NextResponse.json(
          { message: "Email is required for deleting user" },
          { status: 400 }
        );
      }
  
      // Här kan du använda UserModel för att ta bort användaren med den angivna e-postadressen
      const deletedUser = await UserModel.findOneAndDelete({ email });
  
      if (!deletedUser) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { message: "User deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
  }