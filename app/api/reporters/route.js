import connectDB from '@/lib/mongodb';
import Reporter from '@/models/Reporter';
import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export const runtime = 'nodejs';

export async function GET() {
  await connectDB();
  const reporters = await Reporter.find().sort({ createdAt: -1 });
  return NextResponse.json(reporters);
}

export async function POST(request) {
  const formData = await request.formData();

  const name = formData.get("name");
  const area = formData.get("area");
  const contact = formData.get("contact");
  const file = formData.get("photo");

  await connectDB();

  let photoUrl = "";

  if (file && file.arrayBuffer) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "nextjs-reporters",
    });

    photoUrl = uploadResult.secure_url;
  }

  const reporter = await Reporter.create({
    name,
    area,
    contact,
    photo: photoUrl,
  });

  return NextResponse.json(reporter, { status: 201 });
}
