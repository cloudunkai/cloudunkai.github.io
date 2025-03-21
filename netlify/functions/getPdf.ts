import fs from 'fs';
import path from 'path';
import fontkit from '@pdf-lib/fontkit';
import { PDFDocument } from 'pdf-lib';

// 使用 fontkit 和 pdf-lib 生成 PDF
export default defineEventHandler(async (event) => {
  const { resumeContent } = await readBody(event);  // 获取简历内容

  const fontPath = path.join(process.cwd(), 'public', 'fonts', 'NotoSansCJKjp-Regular.ttf');
  const fontBuffer = fs.readFileSync(fontPath);


  // 创建 PDF 文档
  const pdfDoc = await PDFDocument.create();

  // 注册 fontkit
  pdfDoc.registerFontkit(fontkit);

  // 嵌入自定义字体
  const customFont = await pdfDoc.embedFont(fontBuffer);

  // 创建页面
  const page = pdfDoc.addPage([600, 800]);

  // 设置字体和文本内容
  page.drawText(resumeContent, {
    x: 50,
    y: 750,
    font: customFont,
    size: 12,
    maxWidth: 500,
    lineHeight: 14,
  });

  // 保存 PDF 文件
  const pdfBytes = await pdfDoc.save();

  // 返回 PDF 文件
  return new Response(pdfBytes, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="generated_resume.pdf"',
    },
  });
});
