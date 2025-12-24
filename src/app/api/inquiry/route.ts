import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface InquiryData {
  to: string;
  cc: string[];
  subject: string;
  category: string;
  subCategory: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  content: string;
}

// Category badge colors
const categoryColors: Record<string, { bg: string; text: string }> = {
  '開発依頼': { bg: 'rgba(224, 142, 70, 0.15)', text: '#b36a2a' },
  '提携': { bg: 'rgba(8, 145, 178, 0.15)', text: '#0e7490' },
  'ベータ版申し込み': { bg: 'rgba(5, 150, 105, 0.15)', text: '#047857' },
};

function generateEmailHTML(data: InquiryData): string {
  const timestamp = new Date().toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  const colors = categoryColors[data.category] || categoryColors['開発依頼'];

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans JP',sans-serif;background-color:#f7f6f3;padding:40px 20px;line-height:1.6;color:#37352f;">
  <div style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:3px;box-shadow:0 0 0 1px rgba(55,53,47,0.09),0 1px 3px rgba(55,53,47,0.1);overflow:hidden;">
    <!-- Header -->
    <div style="padding:32px 40px 24px;border-bottom:1px solid rgba(55,53,47,0.09);">
      <div style="margin-bottom:24px;text-align:center;">
        <img src="https://sainta-public-files.s3.ap-northeast-1.amazonaws.com/images/sainta-default.png" alt="SAINTA" style="height:36px;width:auto;" />
      </div>

      <div style="width:100%;height:1px;background:rgba(55,53,47,0.09);margin:20px 0;"></div>

      <div style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:3px;font-size:13px;font-weight:500;margin-bottom:16px;background:${colors.bg};color:${colors.text};">
        ${data.category}
      </div>

      <h1 style="font-size:28px;font-weight:700;color:#37352f;margin:0 0 8px;letter-spacing:-0.02em;">お問い合わせ</h1>
      <p style="font-size:14px;color:#787774;margin:0;">ウェブサイトからお問い合わせがありました</p>
    </div>

    <!-- Content -->
    <div style="padding:32px 40px;">
      <div style="margin-bottom:32px;">
        <div style="display:flex;padding:8px 0;border-bottom:1px solid rgba(55,53,47,0.06);">
          <div style="width:140px;flex-shrink:0;font-size:14px;color:#787774;">お名前</div>
          <div style="flex:1;font-size:14px;color:#37352f;">${data.name}</div>
        </div>

        <div style="display:flex;padding:8px 0;border-bottom:1px solid rgba(55,53,47,0.06);">
          <div style="width:140px;flex-shrink:0;font-size:14px;color:#787774;">メール</div>
          <a href="mailto:${data.email}" style="flex:1;font-size:14px;color:#2382e2;text-decoration:none;">${data.email}</a>
        </div>

        <div style="display:flex;padding:8px 0;border-bottom:1px solid rgba(55,53,47,0.06);">
          <div style="width:140px;flex-shrink:0;font-size:14px;color:#787774;">会社名</div>
          <div style="flex:1;font-size:14px;color:#37352f;">${data.company}</div>
        </div>

        <div style="display:flex;padding:8px 0;border-bottom:1px solid rgba(55,53,47,0.06);">
          <div style="width:140px;flex-shrink:0;font-size:14px;color:#787774;">電話番号</div>
          <div style="flex:1;font-size:14px;color:#37352f;">${data.phone}</div>
        </div>

        <div style="display:flex;padding:8px 0;border-bottom:1px solid rgba(55,53,47,0.06);">
          <div style="width:140px;flex-shrink:0;font-size:14px;color:#787774;">カテゴリー</div>
          <div style="flex:1;font-size:14px;color:#37352f;">${data.category}</div>
        </div>

        <div style="display:flex;padding:8px 0;">
          <div style="width:140px;flex-shrink:0;font-size:14px;color:#787774;">詳細</div>
          <div style="flex:1;font-size:14px;color:#37352f;">${data.subCategory}</div>
        </div>
      </div>

      <!-- Message -->
      <div style="margin-top:24px;">
        <div style="font-size:14px;color:#787774;margin-bottom:12px;">お問い合わせ内容</div>
        <div style="background:#f7f6f3;border-radius:3px;padding:20px;font-size:14px;color:#37352f;line-height:1.8;white-space:pre-wrap;border-left:3px solid #e08e46;">${data.content}</div>
      </div>

      <!-- Action -->
      <div style="margin-top:24px;padding-top:24px;border-top:1px solid rgba(55,53,47,0.09);">
        <a href="mailto:${data.email}?subject=Re: お問い合わせありがとうございます" style="display:inline-flex;align-items:center;gap:8px;padding:10px 16px;background:#e08e46;color:white;text-decoration:none;border-radius:3px;font-size:14px;font-weight:500;">
          返信する
        </a>
      </div>
    </div>

    <!-- Metadata -->
    <div style="padding:0 40px 32px;">
      <div style="font-size:12px;color:#9b9a97;margin-bottom:4px;">受信日時: ${timestamp}</div>
      <div style="font-size:12px;color:#9b9a97;">送信元: sainta.co.jp</div>
    </div>

    <!-- Footer -->
    <div style="padding:20px 40px;background:#f7f6f3;border-top:1px solid rgba(55,53,47,0.09);">
      <p style="font-size:12px;color:#9b9a97;text-align:center;margin:0;">
        このメールは <a href="https://sainta.co.jp" style="color:#787774;text-decoration:none;">sainta.co.jp</a> のお問い合わせフォームから自動送信されました。
      </p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const data: InquiryData = await request.json();

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Generate HTML email
    const html = generateEmailHTML(data);

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_SENDER || 'support@sainta.co.jp',
      to: data.to,
      cc: data.cc,
      subject: data.subject,
      html,
    });

    return NextResponse.json({ ok: true, message: '送信完了' });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { ok: false, message: 'メール送信に失敗しました' },
      { status: 500 }
    );
  }
}
