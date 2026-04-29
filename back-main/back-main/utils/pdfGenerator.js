const PDFDocument = require('pdfkit');

exports.generateConventionPDF = (agreement, res) => {
    const doc = new PDFDocument({ margin: 50 });

    doc.pipe(res);

    doc.fontSize(20).text('Internship Agreement', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`, { align: 'right' });
    doc.moveDown();

    doc.fontSize(14).text('Student Information', { underline: true });
    doc.fontSize(12).text(`Full Name: ${agreement.application.student.fullname || 'N/A'}`);
    doc.fontSize(12).text(`Email: ${agreement.application.student.email || 'N/A'}`);
    doc.moveDown();

    doc.fontSize(14).text('Company Information', { underline: true });
    doc.fontSize(12).text(`Company: ${agreement.application.offre.company.fullname || 'N/A'}`);
    doc.moveDown();

    doc.fontSize(14).text('Internship Details', { underline: true });
    doc.fontSize(12).text(`Position Title: ${agreement.application.offre.title || 'N/A'}`);
    doc.fontSize(12).text(`Start Date: ${new Date(agreement.startDate).toLocaleDateString()}`);
    doc.fontSize(12).text(`End Date: ${new Date(agreement.endDate).toLocaleDateString()}`);
    doc.moveDown();

    doc.fontSize(14).text('Validation Status', { underline: true });
    doc.fontSize(12).text(`Validated by Administration: ${agreement.validated ? 'YES' : 'NO'}`);
    doc.moveDown();

    if (doc.y > 600) {
        doc.addPage();
    }

    doc.moveDown(3);
    const startY = doc.y;
    const colWidth = 160;

    doc.fontSize(10).text('Student Signature', 50, startY);
    doc.moveTo(50, startY + 40).lineTo(50 + colWidth, startY + 40).stroke();
    doc.fontSize(8).text('(Sign and Date)', 50, startY + 45);

    doc.fontSize(10).text('Company Signature', 220, startY);
    doc.moveTo(220, startY + 40).lineTo(220 + colWidth, startY + 40).stroke();
    doc.fontSize(8).text('(Stamp, Sign and Date)', 220, startY + 45);

    doc.fontSize(10).text('Administration Signature', 390, startY);
    doc.moveTo(390, startY + 40).lineTo(390 + colWidth, startY + 40).stroke();
    doc.fontSize(8).text('(Official Seal, Sign and Date)', 390, startY + 45);

    doc.end();
};
