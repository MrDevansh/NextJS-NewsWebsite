import connectDB from '@/lib/mongodb';
import News from '@/models/News';
import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export const runtime = 'nodejs'; // Important for Buffer & Cloudinary

export async function GET() {
  await connectDB();
  const news = await News.find().sort({ createdAt: -1 });
  return NextResponse.json(news);
}

export async function POST(request) {
  const formData = await request.formData();

  const title = formData.get("title");
  const content = formData.get("content");
  const author = formData.get("author");
  const category = formData.get("category");
  const file = formData.get("thumbnail");

  await connectDB();

  let thumbnailUrl = "";

  if (file && file.arrayBuffer) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "nextjs-news",
    });

    thumbnailUrl = uploadResult.secure_url;
  }


  const news = await News.create({
    title,
    content,
    author,
    category,
    thumbnail: thumbnailUrl, // 💡 Make sure this is saved
  });

  return NextResponse.json(news, { status: 201 });
}

