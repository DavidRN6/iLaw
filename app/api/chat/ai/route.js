// src/app/api/chat/ai/route.js

import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server'; // لاستخدام الردود في App Router

// تأكد من أن متغير البيئة GEMINI_API_KEY مضبوط في ملف .env
// المكتبة تتعرف عليه تلقائياً
const ai = new GoogleGenAI({});
const MODEL_NAME = "gemini-2.5-flash"; // نموذج سريع

// ===============================================
// دالة POST - لاستقبال البيانات من PromptBox.jsx
// ===============================================
export async function POST(request) {
  try {
    // 1. قراءة البيانات المرسلة من الواجهة الأمامية (promptBox.jsx)
    const { chatId, prompt } = await request.json(); 

    if (!prompt) {
      return NextResponse.json({ success: false, message: 'Prompt is required' }, { status: 400 });
    }

    // 2. الاتصال بنموذج Gemini
    // **ملاحظة: هذا مثال لإرسال سؤال واحد. لإضافة سجل المحادثة، يجب جلب الرسائل السابقة.**
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    
    // 3. تجهيز الرد
    const assistantResponse = {
      role: "assistant",
      content: response.text, // النص الذي تم إنشاؤه بواسطة Gemini
      timestamp: Date.now(),
    };

    // 4. إرسال الرد بنجاح (JSON)
    return NextResponse.json({ 
      success: true, 
      data: assistantResponse 
    }, { status: 200 });

  } catch (error) {
    console.error('Gemini API Error:', error);
    // إرجاع رسالة خطأ
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to communicate with the AI model. Check your API Key and server logs.' 
    }, { status: 500 });
  }
}
