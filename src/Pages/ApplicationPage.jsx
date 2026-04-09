import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2, User, Factory, FileText, Globe, Phone, Mail, MapPin,
    ArrowRight, ArrowLeft, Save, Upload, Check, AlertCircle, X, ChevronDown, ChevronUp, Edit2, Eye, Download, Trash2, Plus, File
} from 'lucide-react';
import QRCode from 'qrcode';

const AGI_CONTACT = {
    address: "42 Dr. Isert Street, North Ridge, Accra",
    digitalAddress: "GA-014-5066",
    phone: "(0302) 251266",
    phoneAlt: "986730",
    email: "agi@agighana.org",
    website: "www.agighana.org",
    logoUrl: "https://res.cloudinary.com/djjgkezui/image/upload/v1773797044/AGI-ACCRA4_ltlvql.png"
};

const SECTORS = [
    "Advertising", "Agri-Business", "Automotive", "Beverages",
    "Construction", "ICT", "Financial Services", "Hospitality",
    "Oil and Gas", "Mining", "Other"
];

const REGIONS = [
    "Ashanti", "Brong-Ahafo", "Central", "Eastern", "Greater Accra",
    "Northern", "Upper East", "Upper West", "Volta", "Western", "Oti"
];

const DOCUMENT_TYPES = [
    { value: 'business-certificate', label: 'Business Certificate' },
    { value: 'passport-photo', label: 'Passport Photo' },
    { value: 'company-logo', label: 'Company Logo' },
    { value: 'work-permit', label: 'Work Permit' },
    { value: 'tin-certificate', label: 'TIN Certificate' },
    { value: 'registration', label: 'Company Registration' },
    { value: 'other', label: 'Other Document' }
];

const ApplicationPage = () => {
    const navigate = useNavigate();
    const [currentSection, setCurrentSection] = useState('A');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showPdfPreview, setShowPdfPreview] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [selectedDocumentType, setSelectedDocumentType] = useState('business-certificate');

    // Review section states
    const [expandedSections, setExpandedSections] = useState({
        personal: true,
        business: true,
        activity: true,
        documents: true,
        membership: true
    });

    const [formData, setFormData] = useState({
        // Application Tracking
        serialNumber: '',
        applicationDate: '',
        status: 'pending',

        // Part A - Company Address & Location
        organizationName: '',
        postalAddress: '',
        town: '',
        region: '',
        companyTelephone: '',
        email: '',
        website: '',
        factoryLocation: '',
        digitalAddress: '',

        // Part A2 - Chief Executive Details
        ceoName: '',
        ceoTitle: '',
        ceoPosition: '',
        ceoContact: '',
        ceoProfile: '',

        // Part A3 - Alternative Contact Person
        altContactName: '',
        altContactTitle: '',
        altContactPosition: '',
        altContactPhone: '',
        altContactEmail: '',

        // Part B - Statistical Data
        ownershipType: '',
        ownershipPercentGhanaian: '',
        ownershipPercentForeign: '',
        yearOperationsBegan: '',
        employeeCount: '',
        turnover: '',
        companyProfile: '',
        exportMarkets: '',
        interestTradeFairs: '',
        importPercentage: '',
        currentGEA: false,
        currentGNCCI: false,
        currentFAGE: false,
        currentOther: '',

        // Part C - Publication Data
        selectedSectors: [],
        mainBusinessArea: '',
        productService1: '',
        productService2: '',
        productService3: '',
        productService4: '',
        productService5: '',

        // Terms
        agreeTerms: false
    });

    // Generate unique serial number
    const generateSerialNumber = () => {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const year = new Date().getFullYear();
        return `AGI-MEM-${year}-${timestamp}-${random}`;
    };

    // Multiple documents support
    const [documents, setDocuments] = useState([]);

    const sections = [
        { id: 'A', label: 'Company Details', parts: ['A', 'A2', 'A3'] },
        { id: 'B', label: 'Company Statistics' },
        { id: 'C', label: 'Business Activities' },
        { id: 'review', label: 'Review' }
    ];

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    // Handle file upload with document type
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const newDocs = files.map(file => ({
            id: Date.now() + Math.random(),
            file: file,
            name: file.name,
            type: selectedDocumentType,
            typeLabel: DOCUMENT_TYPES.find(d => d.value === selectedDocumentType)?.label || 'Business Certificate'
        }));
        setDocuments(prev => [...prev, ...newDocs]);
        e.target.value = ''; // Reset input
    };

    // Update document type for a specific document
    const updateDocumentType = (docId, newType) => {
        setDocuments(prev => prev.map(doc =>
            doc.id === docId
                ? { ...doc, type: newType, typeLabel: DOCUMENT_TYPES.find(d => d.value === newType)?.label || 'Document' }
                : doc
        ));
    };

    // Remove a document
    const removeDocument = (docId) => {
        setDocuments(prev => prev.filter(doc => doc.id !== docId));
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const goToEditSection = (section) => {
        setShowPdfPreview(false);
        if (section === 'personal') {
            setCurrentSection('A');
        } else if (section === 'business') {
            setCurrentSection('B');
        } else if (section === 'activity' || section === 'documents') {
            setCurrentSection('C');
        } else if (section === 'membership') {
            setCurrentSection('B');
        }
    };

    const validateSection = (section) => {
        const newErrors = {};

        if (section === 'A') {
            const required = ['organizationName', 'postalAddress', 'town', 'region', 'companyTelephone', 'email'];
            required.forEach(field => {
                if (!formData[field]) {
                    newErrors[field] = 'This field is required';
                }
            });
            if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }
        }

        if (section === 'A2') {
            const required = ['ceoName', 'ceoTitle', 'ceoPosition', 'ceoContact', 'ceoProfile'];
            required.forEach(field => {
                if (!formData[field]) {
                    newErrors[field] = 'This field is required';
                }
            });
            if (formData.ceoProfile && formData.ceoProfile.split(/\s+/).filter(w => w.length > 0).length < 300) {
                newErrors.ceoProfile = `Profile must be at least 300 words (currently ${formData.ceoProfile.split(/\s+/).filter(w => w.length > 0).length} words)`;
            }
        }

        if (section === 'B') {
            const required = ['ownershipType', 'yearOperationsBegan', 'employeeCount', 'companyProfile'];
            required.forEach(field => {
                if (!formData[field]) {
                    newErrors[field] = 'This field is required';
                }
            });
            if (formData.companyProfile && formData.companyProfile.split(/\s+/).filter(w => w.length > 0).length < 300) {
                newErrors.companyProfile = `Profile must be at least 300 words (currently ${formData.companyProfile.split(/\s+/).filter(w => w.length > 0).length} words)`;
            }
        }

        if (section === 'C') {
            if (formData.selectedSectors.length === 0) {
                newErrors.selectedSectors = 'Please select at least one business sector';
            }
            if (!formData.mainBusinessArea) {
                newErrors.mainBusinessArea = 'This field is required';
            }
            const products = [formData.productService1, formData.productService2, formData.productService3, formData.productService4, formData.productService5];
            const filledProducts = products.filter(p => p.trim());
            if (filledProducts.length === 0) {
                newErrors.products = 'Please add at least one product or service';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextSection = () => {
        if (currentSection === 'A') {
            if (validateSection('A') && validateSection('A2')) {
                setCurrentSection('B');
            }
        } else if (currentSection === 'B') {
            if (validateSection('B')) {
                setCurrentSection('C');
            }
        } else if (currentSection === 'C') {
            if (validateSection('C')) {
                setCurrentSection('review');
            }
        }
    };

    const prevSection = () => {
        if (currentSection === 'B') setCurrentSection('A');
        if (currentSection === 'C') setCurrentSection('B');
        if (currentSection === 'review') setCurrentSection('C');
    };

    const handleSubmit = () => {
        if (!formData.agreeTerms) {
            setErrors({ agreeTerms: 'You must agree to the terms and conditions' });
            return;
        }
        setIsSubmitting(true);

        // Generate serial number and application date
        const serialNumber = generateSerialNumber();
        const applicationDate = new Date().toISOString();

        // Update form data with serial number and date
        const submittedData = {
            ...formData,
            serialNumber,
            applicationDate,
            status: 'pending'
        };

        // Save to localStorage for admin tracking
        const existingApplications = JSON.parse(localStorage.getItem('agi_applications') || '[]');
        existingApplications.push({
            ...submittedData,
            documents: documents.map(doc => ({ name: doc.name, type: doc.type, typeLabel: doc.typeLabel })),
            submittedAt: applicationDate
        });
        localStorage.setItem('agi_applications', JSON.stringify(existingApplications));

        // Simulate form submission and email sending
        setTimeout(() => {
            setIsSubmitting(false);
            setEmailSent(true);

            // Show success and navigate
            navigate('/success', {
                state: {
                    title: 'Application Submitted!',
                    message: `Thank you for applying to become a member of the Association of Ghana Industries. Your application for ${formData.organizationName} has been received. Your Application Serial Number is: ${serialNumber}. A confirmation email with your application PDF has been sent to ${formData.email} and AGI. You will be contacted within 5-7 business days.`,
                    type: 'success',
                    redirectTo: '/',
                    redirectText: 'Go Home',
                    actionButtons: [
                        { text: 'Return Home', path: '/', icon: null },
                        { text: 'View Blog', path: '/blog', icon: null }
                    ],
                    serialNumber: serialNumber
                }
            });
        }, 2500);
    };

    const toggleSector = (sector) => {
        const current = formData.selectedSectors;
        if (current.includes(sector)) {
            updateField('selectedSectors', current.filter(s => s !== sector));
        } else if (current.length < 3) {
            updateField('selectedSectors', [...current, sector]);
        }
    };

    const wordCount = (text) => text ? text.split(/\s+/).filter(w => w.length > 0).length : 0;

    // Get current membership organizations
    const getMemberships = () => {
        const orgs = [];
        if (formData.currentGEA) orgs.push('Ghana Employers Association (GEA)');
        if (formData.currentGNCCI) orgs.push('Ghana National Chamber of Commerce (GNCCI)');
        if (formData.currentFAGE) orgs.push('FAGE');
        if (formData.currentOther) orgs.push(formData.currentOther);
        return orgs.length > 0 ? orgs.join(', ') : 'None';
    };

    // Generate PDF with AGI logo and company logo support
    // Add this import at the top of your file (after other imports)

    // Then replace your generateAndDownloadPDF function with this:
    const generateAndDownloadPDF = async () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF("p", "mm", "a4");

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const margin = 18;
        const contentWidth = pageWidth - (margin * 2);
        const colGap = 8;
        const colWidth = (contentWidth - colGap) / 2;

        let yPos = 25;

        const COLORS = {
            primary: [178, 34, 52],
            dark: [28, 28, 30],
            light: [100, 100, 110],
            border: [215, 225, 235],
            white: [255, 255, 255]
        };

        const cleanText = (text) => {
            if (!text) return "";
            return String(text).replace(/[^\w\s\.,\-\(\)\/]/g, '').replace(/[•°■□▸▪➢➤→←↑↓★☆✓✔✗✘⚡🔥💼🏢👤📊⚙️📎✍️🔐🧾🧭🚀]/g, '');
        };

        // Generate Document ID
        const docId = `AGI-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

        // ============================================
        // RED HEADER BAR
        // ============================================
        doc.setFillColor(...COLORS.primary);
        doc.rect(0, 0, pageWidth, 38, 'F');

        doc.setTextColor(...COLORS.white);

        // Logo
        const logoSize = 18;
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(margin, 6, logoSize, logoSize, 3, 3, 'F');

        let logoLoaded = false;
        try {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = AGI_CONTACT.logoUrl;

            await new Promise((res, rej) => {
                img.onload = res;
                img.onerror = rej;
                setTimeout(() => rej(new Error('timeout')), 2000);
            });

            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const colorImageData = canvas.toDataURL('image/png');
            doc.addImage(colorImageData, "PNG", margin + 2, 8, 14, 14);
            logoLoaded = true;
        } catch (error) {
            console.warn("Logo image failed, using text logo");
        }

        if (!logoLoaded) {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(...COLORS.primary);
            doc.text("AGI", margin + 4, 19);
            doc.setTextColor(...COLORS.white);
        }

        const textX = margin + logoSize + 6;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("ASSOCIATION OF GHANA INDUSTRIES", textX, 18);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.text("Membership Application Form", textX, 26);

        doc.setTextColor(...COLORS.dark);

        // Contact info
        yPos = 48;
        doc.setFontSize(7.5);
        doc.setTextColor(...COLORS.light);
        doc.text(
            `${AGI_CONTACT.address}   |   ${AGI_CONTACT.phone}   |   ${AGI_CONTACT.email}`,
            pageWidth / 2,
            yPos,
            { align: "center" }
        );

        yPos += 8;

        // Document ID display - Added back
        doc.setFillColor(245, 248, 250);
        doc.roundedRect(pageWidth - margin - 65, yPos - 2, 65, 5, 2, 2, 'F');
        doc.setFontSize(6.5);
        doc.setTextColor(...COLORS.light);
        doc.text(`Document ID: ${docId}`, pageWidth - margin - 62, yPos + 1);

        yPos += 6;

        doc.setDrawColor(...COLORS.border);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;

        // ============================================
        // HELPER FUNCTIONS
        // ============================================
        const addSection = (title) => {
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
                // Re-add Document ID on new page
                doc.setFillColor(245, 248, 250);
                doc.roundedRect(pageWidth - margin - 65, yPos - 2, 65, 5, 2, 2, 'F');
                doc.setFontSize(6.5);
                doc.setTextColor(...COLORS.light);
                doc.text(`Document ID: ${docId}`, pageWidth - margin - 62, yPos + 1);
                yPos += 6;
            }

            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(...COLORS.primary);
            doc.text(title, margin, yPos);

            doc.setDrawColor(...COLORS.primary);
            doc.setLineWidth(0.3);
            doc.line(margin, yPos + 2, margin + 55, yPos + 2);

            yPos += 8;
        };

        const addRow = (l1, v1, l2, v2) => {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
                // Re-add Document ID on new page
                doc.setFillColor(245, 248, 250);
                doc.roundedRect(pageWidth - margin - 65, yPos - 2, 65, 5, 2, 2, 'F');
                doc.setFontSize(6.5);
                doc.setTextColor(...COLORS.light);
                doc.text(`Document ID: ${docId}`, pageWidth - margin - 62, yPos + 1);
                yPos += 6;
            }

            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor(...COLORS.light);
            doc.text(cleanText(l1), margin, yPos);

            doc.setFont("helvetica", "bold");
            doc.setFontSize(9.5);
            const val1 = cleanText(v1 && v1 !== "" ? v1 : "Not provided");
            doc.setTextColor(...COLORS.dark);

            const maxWidth = l2 ? colWidth - 5 : contentWidth - 10;
            const lines1 = doc.splitTextToSize(val1, maxWidth);
            doc.text(lines1, margin, yPos + 5);
            let lineHeight = 5 + (lines1.length * 4);

            if (l2) {
                doc.setFont("helvetica", "normal");
                doc.setFontSize(8);
                doc.setTextColor(...COLORS.light);
                doc.text(cleanText(l2), margin + colWidth + colGap, yPos);

                doc.setFont("helvetica", "bold");
                doc.setFontSize(9.5);
                const val2 = cleanText(v2 && v2 !== "" ? v2 : "Not provided");
                doc.setTextColor(...COLORS.dark);
                const lines2 = doc.splitTextToSize(val2, colWidth - 5);
                doc.text(lines2, margin + colWidth + colGap, yPos + 5);
                lineHeight = Math.max(lineHeight, 5 + (lines2.length * 4));
            }

            doc.setTextColor(...COLORS.dark);
            yPos += lineHeight + 4;
        };

        const addFullRow = (label, value) => {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
                // Re-add Document ID on new page
                doc.setFillColor(245, 248, 250);
                doc.roundedRect(pageWidth - margin - 65, yPos - 2, 65, 5, 2, 2, 'F');
                doc.setFontSize(6.5);
                doc.setTextColor(...COLORS.light);
                doc.text(`Document ID: ${docId}`, pageWidth - margin - 62, yPos + 1);
                yPos += 6;
            }

            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor(...COLORS.light);
            doc.text(cleanText(label), margin, yPos);

            doc.setFont("helvetica", "bold");
            doc.setFontSize(9.5);
            const val = cleanText(value && value !== "" ? value : "Not provided");
            doc.setTextColor(...COLORS.dark);

            const lines = doc.splitTextToSize(val, contentWidth - 10);
            doc.text(lines, margin, yPos + 5);
            yPos += 8 + (lines.length * 4);
        };

        // ============================================
        // COMPANY DETAILS
        // ============================================
        addSection("COMPANY DETAILS");
        addRow("Organization Name", formData.organizationName, "Town or City", formData.town);
        addRow("Postal Address", formData.postalAddress, "Region", formData.region);
        addRow("Phone Number", formData.companyTelephone, "Email Address", formData.email);
        if (formData.website) addRow("Website", formData.website, "", "");

        // ============================================
        // CEO DETAILS
        // ============================================
        addSection("CHIEF EXECUTIVE DETAILS");
        const ceoFullName = formData.ceoTitle ? `${formData.ceoTitle} ${formData.ceoName}` : formData.ceoName;
        addRow("Full Name", ceoFullName, "Position", formData.ceoPosition);
        addRow("Contact Number", formData.ceoContact, "", "");

        // ============================================
        // ALTERNATIVE CONTACT
        // ============================================
        if (formData.altContactName) {
            addSection("ALTERNATIVE CONTACT PERSON");
            addRow("Full Name", formData.altContactName, "Title", formData.altContactTitle);
            addRow("Position", formData.altContactPosition, "Phone Number", formData.altContactPhone);
            if (formData.altContactEmail) addRow("Email Address", formData.altContactEmail, "", "");
        }

        // ============================================
        // BUSINESS DATA
        // ============================================
        addSection("BUSINESS AND FINANCIAL DATA");
        addRow("Ownership Structure", formData.ownershipType, "Total Employees", formData.employeeCount);
        if (formData.ownershipPercentGhanaian) {
            addRow("Ghanaian Ownership", `${formData.ownershipPercentGhanaian}%`, "Foreign Ownership", `${formData.ownershipPercentForeign || 0}%`);
        }
        addRow("Year Operations Began", formData.yearOperationsBegan, "Annual Turnover", formData.turnover || "Not Disclosed");
        addRow("Export Markets", formData.exportMarkets || "None", "Trade Fair Interest", formData.interestTradeFairs || "Not specified");

        // Company Profile
        if (formData.companyProfile && formData.companyProfile.trim().length > 0) {
            addFullRow("Company Profile", formData.companyProfile);
        }

        // CEO Profile
        if (formData.ceoProfile && formData.ceoProfile.trim().length > 0) {
            addFullRow("CEO Profile", formData.ceoProfile);
        }

        // ============================================
        // BUSINESS ACTIVITY
        // ============================================
        addSection("CORE BUSINESS ACTIVITY");
        const sectorsFormatted = Array.isArray(formData.selectedSectors)
            ? formData.selectedSectors.join(", ")
            : (formData.selectedSectors || "Not specified");
        addRow("Industry Sectors", sectorsFormatted, "Main Business Area", formData.mainBusinessArea);

        const products = [formData.productService1, formData.productService2, formData.productService3, formData.productService4, formData.productService5].filter(p => p && p.trim());
        if (products.length > 0) {
            addFullRow("Products and Services", products.join(", "));
        }

        // ============================================
        // MEMBERSHIPS
        // ============================================
        const memberships = [];
        if (formData.currentGEA) memberships.push("Ghana Employers Association (GEA)");
        if (formData.currentGNCCI) memberships.push("Ghana National Chamber of Commerce (GNCCI)");
        if (formData.currentFAGE) memberships.push("FAGE");
        if (formData.currentOther) memberships.push(formData.currentOther);
        if (memberships.length > 0) {
            addSection("CURRENT MEMBERSHIPS");
            addFullRow("Member Organizations", memberships.join(", "));
        }

        // ============================================
        // DOCUMENTS
        // ============================================
        if (documents.length > 0) {
            addSection("SUPPORTING DOCUMENTS");
            const docList = documents.map((doc, idx) => `${idx + 1}. ${cleanText(doc.typeLabel)}: ${cleanText(doc.name)}`).join("\n");
            addFullRow("Uploaded Files", docList);
        }

        // ============================================
        // AUTHORIZATION
        // ============================================
        addSection("AUTHORIZATION AND SIGN OFF");

        const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        doc.setFontSize(8);
        doc.setTextColor(...COLORS.light);
        doc.text(`Date: ${currentDate}`, margin, yPos + 5);
        yPos += 12;

        doc.setDrawColor(180, 180, 190);
        doc.setLineWidth(0.4);

        doc.line(margin, yPos + 5, margin + 70, yPos + 5);
        doc.setFontSize(7.5);
        doc.setTextColor(120, 120, 130);
        doc.text("Applicant Signature", margin, yPos + 11);

        doc.line(pageWidth - margin - 75, yPos + 5, pageWidth - margin, yPos + 5);
        doc.text("Official Company Stamp", pageWidth - margin - 72, yPos + 11);

        doc.line(margin, yPos + 20, margin + 70, yPos + 20);
        doc.text("Printed Name and Title", margin, yPos + 26);

        yPos += 40;

        // ============================================
        // QR CODE
        // ============================================
        const verificationURL = `https://agi.gh/verify/${docId}`;

        try {
            const qrCodeDataURL = await QRCode.toDataURL(verificationURL, {
                width: 180,
                margin: 2,
                color: {
                    dark: '#B22234',
                    light: '#FFFFFF'
                }
            });

            if (qrCodeDataURL && qrCodeDataURL.length > 100) {
                const qrSize = 32;
                const qrX = pageWidth - margin - qrSize;
                const qrY = yPos;

                doc.setFillColor(255, 255, 255);
                doc.roundedRect(qrX - 3, qrY - 3, qrSize + 6, qrSize + 6, 3, 3, 'F');
                doc.setDrawColor(...COLORS.border);
                doc.roundedRect(qrX - 3, qrY - 3, qrSize + 6, qrSize + 6, 3, 3, 'S');

                doc.addImage(qrCodeDataURL, "PNG", qrX, qrY, qrSize, qrSize);

                doc.setFontSize(6);
                doc.setTextColor(...COLORS.primary);
                doc.text("Scan to Verify", qrX + 2, qrY + qrSize + 5);
                doc.setFontSize(5);
                doc.setTextColor(...COLORS.light);
                doc.text("AGI Secure", qrX + 6, qrY + qrSize + 10);
            }
        } catch (err) {
            console.warn("QR generation failed:", err);
            doc.setFontSize(7);
            doc.setTextColor(...COLORS.light);
            doc.text(`Application ID: ${docId.slice(-16)}`, pageWidth - margin - 55, yPos + 15);
        }

        // ============================================
        // FOOTER
        // ============================================
        const footerY = pageHeight - 12;

        doc.setDrawColor(...COLORS.border);
        doc.setLineWidth(0.3);
        doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

        doc.setFontSize(6.5);
        doc.setTextColor(130, 130, 145);
        doc.text(`Generated: ${new Date().toLocaleString()}`, margin, footerY);
        doc.text("Association of Ghana Industries", pageWidth / 2, footerY, { align: "center" });

        // ============================================
        // SAVE
        // ============================================
        const safeName = (formData.organizationName || "Application")
            .replace(/[^a-z0-9]/gi, "_")
            .substring(0, 40);
        doc.save(`AGI_Membership_${safeName}.pdf`);
    };


    // Preview PDF Content
    const PreviewPDFContent = () => (
        <div className="bg-white p-6 max-h-[70vh] overflow-y-auto text-sm">
            <div className="bg-white border-2 border-gray-200 p-4 -m-6 mb-4 rounded-lg flex items-center gap-4 shadow-sm">
                <div className="w-14 h-14 flex items-center justify-center bg-red-600 rounded-lg">
                    <img src={AGI_CONTACT.logoUrl} alt="AGI Logo" className="w-12 h-12 object-contain" />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-slate-800">ASSOCIATION OF GHANA INDUSTRIES</h3>
                    <p className="text-sm text-gray-600">Membership Application Form</p>
                    <p className="text-xs text-gray-500">Submitted: {new Date().toLocaleDateString()}</p>
                    {formData.serialNumber && (
                        <p className="text-xs font-bold text-red-600 mt-1">Serial No: {formData.serialNumber}</p>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <div className="border-b-2 border-red-600 pb-1">
                    <h4 className="font-bold text-red-700">PART A: Company Address & Location</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div><span className="font-medium text-gray-500">Organization:</span> <span className="text-gray-900">{formData.organizationName || '-'}</span></div>
                    <div><span className="font-medium text-gray-500">Email:</span> <span className="text-gray-900">{formData.email || '-'}</span></div>
                    <div><span className="font-medium text-gray-500">Town:</span> <span className="text-gray-900">{formData.town || '-'}</span></div>
                    <div><span className="font-medium text-gray-500">Region:</span> <span className="text-gray-900">{formData.region || '-'}</span></div>
                </div>

                <div className="border-b-2 border-red-600 pb-1 mt-4">
                    <h4 className="font-bold text-red-700">PART A2: Chief Executive</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div><span className="font-medium text-gray-500">CEO:</span> <span className="text-gray-900">{formData.ceoTitle} {formData.ceoName || '-'}</span></div>
                    <div><span className="font-medium text-gray-500">Position:</span> <span className="text-gray-900">{formData.ceoPosition || '-'}</span></div>
                </div>

                <div className="border-b-2 border-red-600 pb-1 mt-4">
                    <h4 className="font-bold text-red-700">PART B: Business Statistics</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div><span className="font-medium text-gray-500">Ownership:</span> <span className="text-gray-900">{formData.ownershipType || '-'}</span></div>
                    <div><span className="font-medium text-gray-500">Employees:</span> <span className="text-gray-900">{formData.employeeCount || '-'}</span></div>
                </div>

                <div className="border-b-2 border-red-600 pb-1 mt-4">
                    <h4 className="font-bold text-red-700">PART C: Business Activity</h4>
                </div>
                <div><span className="font-medium text-gray-500">Sectors:</span> <span className="text-gray-900 ml-2">{formData.selectedSectors.join(', ') || '-'}</span></div>

                <div className="border-b-2 border-red-600 pb-1 mt-4">
                    <h4 className="font-bold text-red-700">UPLOADED DOCUMENTS</h4>
                </div>
                {documents.length > 0 ? (
                    <ul className="space-y-1">
                        {documents.map((doc, idx) => (
                            <li key={doc.id} className="flex items-center gap-2 text-gray-900">
                                <span className="font-medium">{idx + 1}. {doc.typeLabel}:</span>
                                <span>{doc.name}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <span className="text-gray-500">No documents uploaded</span>
                )}
            </div>
        </div>
    );

    return (
        <div className="bg-[#f8fafc] min-h-screen pt-24 pb-12 px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <header className="mb-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-white text-slate-800 px-6 py-4 rounded-lg font-bold text-lg flex items-center gap-3 shadow-lg border-2 border-gray-200">
                            <div className="w-12 h-12 flex items-center justify-center bg-red-600 rounded-lg">
                                <img
                                    src={AGI_CONTACT.logoUrl}
                                    alt="AGI Logo"
                                    className="w-10 h-10 object-contain"
                                />
                            </div>
                            <span className="text-slate-800">ASSOCIATION OF GHANA INDUSTRIES</span>
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-2">Membership Application Form</h1>
                    <p className="text-gray-600 font-medium">Complete all sections to apply for AGI membership</p>
                </header>

                {/* Contact Info Banner */}
                <div className="bg-slate-800 text-white rounded-lg p-4 mb-6 text-sm">
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-red-400" />
                            <span>{AGI_CONTACT.address}, {AGI_CONTACT.digitalAddress}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={16} className="text-red-400" />
                            <span>{AGI_CONTACT.phone}, {AGI_CONTACT.phoneAlt}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={16} className="text-red-400" />
                            <span>{AGI_CONTACT.email}</span>
                        </div>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
                    <div className="flex justify-between items-center">
                        {sections.map((section, idx) => (
                            <React.Fragment key={section.id}>
                                <button
                                    onClick={() => {
                                        if (section.id === 'A' ||
                                            (section.id === 'B' && validateSection('A') && validateSection('A2')) ||
                                            (section.id === 'C' && validateSection('A') && validateSection('A2') && validateSection('B'))) {
                                            setCurrentSection(section.id);
                                        }
                                    }}
                                    className={`flex items-center gap-2 ${currentSection === section.id ? 'text-red-600' : 'text-gray-400'}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentSection === section.id ? 'bg-red-600 text-white' : currentSection > section.id && section.id !== 'review' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>
                                        {section.id === 'review' ? <Check size={16} /> : idx + 1}
                                    </div>
                                    <span className="hidden md:inline font-medium text-sm">{section.label}</span>
                                </button>
                                {idx < sections.length - 1 && (
                                    <div className={`flex-1 h-0.5 mx-2 ${currentSection > section.id && section.id !== 'review' ? 'bg-red-600' : 'bg-gray-200'}`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <AnimatePresence mode="wait">
                        {/* Part A - Company Details */}
                        {(currentSection === 'A') && (
                            <motion.div
                                key="section-a"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-6 md:p-8"
                            >
                                <SectionHeader
                                    title="PART A: Company Address & Location"
                                    icon={<Building2 className="text-red-600" size={24} />}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <FormInput
                                        label="Organization Name *"
                                        placeholder="Enter registered company name"
                                        value={formData.organizationName}
                                        onChange={(v) => updateField('organizationName', v)}
                                        error={errors.organizationName}
                                    />
                                    <FormInput
                                        label="Postal Address *"
                                        placeholder="P.O. Box, City, Country"
                                        value={formData.postalAddress}
                                        onChange={(v) => updateField('postalAddress', v)}
                                        error={errors.postalAddress}
                                    />
                                    <FormInput
                                        label="Town *"
                                        placeholder="Enter town"
                                        value={formData.town}
                                        onChange={(v) => updateField('town', v)}
                                        error={errors.town}
                                    />
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Region *</label>
                                        <select
                                            value={formData.region}
                                            onChange={(e) => updateField('region', e.target.value)}
                                            className={`w-full bg-white border ${errors.region ? 'border-red-500' : 'border-gray-200'} p-3 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition-all text-sm text-slate-900`}
                                        >
                                            <option value="">Select Region</option>
                                            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                                        </select>
                                        {errors.region && <ErrorMessage msg={errors.region} />}
                                    </div>
                                    <FormInput
                                        label="Company Telephone *"
                                        placeholder="e.g. (0302) 123456"
                                        value={formData.companyTelephone}
                                        onChange={(v) => updateField('companyTelephone', v)}
                                        error={errors.companyTelephone}
                                    />
                                    <FormInput
                                        label="Email Address *"
                                        placeholder="company@email.com"
                                        type="email"
                                        value={formData.email}
                                        onChange={(v) => updateField('email', v)}
                                        error={errors.email}
                                    />
                                    <FormInput
                                        label="Website"
                                        placeholder="www.company.com"
                                        value={formData.website}
                                        onChange={(v) => updateField('website', v)}
                                    />
                                    <FormInput
                                        label="Digital Address"
                                        placeholder="e.g. GA-014-5066"
                                        value={formData.digitalAddress}
                                        onChange={(v) => updateField('digitalAddress', v)}
                                    />
                                </div>

                                {/* Document Upload Section */}
                                <div className="mt-8 p-6 bg-gray-100 rounded-lg border-2 border-gray-200">
                                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <File className="text-red-600" size={20} />
                                        Upload Supporting Documents
                                    </h3>

                                    {/* Document Type Selection */}
                                    <div className="flex flex-wrap items-end gap-4 mb-4">
                                        <div className="flex-1 min-w-[200px]">
                                            <label className="text-sm font-bold text-gray-900 mb-1 block">Document Type</label>
                                            <select
                                                value={selectedDocumentType}
                                                onChange={(e) => setSelectedDocumentType(e.target.value)}
                                                className="w-full bg-white border border-gray-300 p-2.5 rounded-lg text-sm text-gray-900"
                                            >
                                                {DOCUMENT_TYPES.map(type => (
                                                    <option key={type.value} value={type.value}>{type.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <label className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-700 transition-colors">
                                            <Upload size={18} />
                                            <span className="font-medium">Add Document</span>
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*,.pdf,.doc,.docx"
                                                onChange={handleFileUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>

                                    {/* Uploaded Documents List */}
                                    {documents.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            <p className="text-sm font-bold text-gray-900">{documents.length} document(s) uploaded:</p>
                                            {documents.map((doc) => (
                                                <div key={doc.id} className="flex items-center gap-3 p-3 bg-white border border-gray-300 rounded-lg">
                                                    <File size={20} className="text-gray-500" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                                                        <select
                                                            value={doc.type}
                                                            onChange={(e) => updateDocumentType(doc.id, e.target.value)}
                                                            className="text-xs border border-gray-300 rounded px-2 py-1 mt-1 text-gray-700"
                                                        >
                                                            {DOCUMENT_TYPES.map(type => (
                                                                <option key={type.value} value={type.value}>{type.label}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <button
                                                        onClick={() => removeDocument(doc.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {documents.length === 0 && (
                                        <p className="text-sm text-gray-700 italic">No documents uploaded yet. Please upload your business certificate, passport photo, and other required documents.</p>
                                    )}
                                </div>

                                <SectionHeader
                                    title="PART A2: Chief Executive Details"
                                    icon={<User className="text-red-600" size={24} />}
                                    className="mt-10"
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <FormInput
                                        label="Full Name *"
                                        placeholder="CEO/Managing Director full name"
                                        value={formData.ceoName}
                                        onChange={(v) => updateField('ceoName', v)}
                                        error={errors.ceoName}
                                    />
                                    <FormInput
                                        label="Title *"
                                        placeholder="e.g. Mr., Mrs., Ms., Dr."
                                        value={formData.ceoTitle}
                                        onChange={(v) => updateField('ceoTitle', v)}
                                        error={errors.ceoTitle}
                                    />
                                    <FormInput
                                        label="Position *"
                                        placeholder="e.g. Managing Director, CEO"
                                        value={formData.ceoPosition}
                                        onChange={(v) => updateField('ceoPosition', v)}
                                        error={errors.ceoPosition}
                                    />
                                    <FormInput
                                        label="Contact Number *"
                                        placeholder="Phone number"
                                        value={formData.ceoContact}
                                        onChange={(v) => updateField('ceoContact', v)}
                                        error={errors.ceoContact}
                                    />
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Personal Profile * (Minimum 300 words)</label>
                                        <textarea
                                            rows={6}
                                            placeholder="Provide a detailed personal profile including education, experience, and professional achievements..."
                                            value={formData.ceoProfile}
                                            onChange={(e) => updateField('ceoProfile', e.target.value)}
                                            className={`w-full bg-white border ${errors.ceoProfile ? 'border-red-500' : 'border-gray-200'} p-3 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition-all text-sm text-slate-900 resize-none`}
                                        />
                                        <div className="flex justify-between text-xs">
                                            {errors.ceoProfile ? (
                                                <ErrorMessage msg={errors.ceoProfile} />
                                            ) : (
                                                <span className="text-gray-500">Minimum 300 words</span>
                                            )}
                                            <span className={wordCount(formData.ceoProfile) >= 300 ? 'text-green-600' : 'text-gray-500'}>
                                                {wordCount(formData.ceoProfile)} / 300 words
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <SectionHeader
                                    title="PART A3: Alternative Contact Person (If different from CEO)"
                                    icon={<User className="text-red-600" size={24} />}
                                    className="mt-10"
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <FormInput
                                        label="Contact Name"
                                        placeholder="Full name"
                                        value={formData.altContactName}
                                        onChange={(v) => updateField('altContactName', v)}
                                    />
                                    <FormInput
                                        label="Title"
                                        placeholder="e.g. Mr., Mrs., Ms., Dr."
                                        value={formData.altContactTitle}
                                        onChange={(v) => updateField('altContactTitle', v)}
                                    />
                                    <FormInput
                                        label="Position"
                                        placeholder="Job title"
                                        value={formData.altContactPosition}
                                        onChange={(v) => updateField('altContactPosition', v)}
                                    />
                                    <FormInput
                                        label="Phone Number"
                                        placeholder="Contact phone"
                                        value={formData.altContactPhone}
                                        onChange={(v) => updateField('altContactPhone', v)}
                                    />
                                    <FormInput
                                        label="Email Address"
                                        placeholder="Email address"
                                        value={formData.altContactEmail}
                                        onChange={(v) => updateField('altContactEmail', v)}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Part B - Statistical Data */}
                        {(currentSection === 'B') && (
                            <motion.div
                                key="section-b"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-6 md:p-8"
                            >
                                <SectionHeader
                                    title="PART B: Statistical Data"
                                    icon={<FileText className="text-red-600" size={24} />}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Ownership Type *</label>
                                        <select
                                            value={formData.ownershipType}
                                            onChange={(e) => updateField('ownershipType', e.target.value)}
                                            className={`w-full bg-white border ${errors.ownershipType ? 'border-red-500' : 'border-gray-200'} p-3 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition-all text-sm text-slate-900`}
                                        >
                                            <option value="">Select Ownership Type</option>
                                            <option value="Ghanaian Owned">100% Ghanaian Owned</option>
                                            <option value="Foreign Owned">100% Foreign Owned</option>
                                            <option value="Joint Venture">Joint Venture</option>
                                            <option value="Public Limited">Public Limited Company</option>
                                            <option value="Private Limited">Private Limited Company</option>
                                        </select>
                                        {errors.ownershipType && <ErrorMessage msg={errors.ownershipType} />}
                                    </div>
                                    <FormInput
                                        label="% Ghanaian Ownership"
                                        placeholder="e.g. 60"
                                        type="number"
                                        value={formData.ownershipPercentGhanaian}
                                        onChange={(v) => updateField('ownershipPercentGhanaian', v)}
                                    />
                                    <FormInput
                                        label="% Foreign Ownership"
                                        placeholder="e.g. 40"
                                        type="number"
                                        value={formData.ownershipPercentForeign}
                                        onChange={(v) => updateField('ownershipPercentForeign', v)}
                                    />
                                    <FormInput
                                        label="Year Operations Began *"
                                        placeholder="e.g. 2005"
                                        type="number"
                                        value={formData.yearOperationsBegan}
                                        onChange={(v) => updateField('yearOperationsBegan', v)}
                                        error={errors.yearOperationsBegan}
                                    />
                                    <FormInput
                                        label="Number of Employees *"
                                        placeholder="e.g. 50"
                                        value={formData.employeeCount}
                                        onChange={(v) => updateField('employeeCount', v)}
                                        error={errors.employeeCount}
                                    />
                                    <FormInput
                                        label="Annual Turnover (USD)"
                                        placeholder="e.g. 500,000"
                                        value={formData.turnover}
                                        onChange={(v) => updateField('turnover', v)}
                                    />
                                </div>

                                <div className="mt-6 space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Company Profile * (Minimum 300 words)</label>
                                    <textarea
                                        rows={6}
                                        placeholder="Provide a detailed company profile including history, operations, and achievements..."
                                        value={formData.companyProfile}
                                        onChange={(e) => updateField('companyProfile', e.target.value)}
                                        className={`w-full bg-white border ${errors.companyProfile ? 'border-red-500' : 'border-gray-200'} p-3 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition-all text-sm text-slate-900 resize-none`}
                                    />
                                    <div className="flex justify-between text-xs">
                                        {errors.companyProfile ? (
                                            <ErrorMessage msg={errors.companyProfile} />
                                        ) : (
                                            <span className="text-gray-500">Minimum 300 words</span>
                                        )}
                                        <span className={wordCount(formData.companyProfile) >= 300 ? 'text-green-600' : 'text-gray-500'}>
                                            {wordCount(formData.companyProfile)} / 300 words
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput
                                        label="Export Markets (if any)"
                                        placeholder="Countries you export to"
                                        value={formData.exportMarkets}
                                        onChange={(v) => updateField('exportMarkets', v)}
                                    />
                                    <FormInput
                                        label="Interest in Trade Fairs"
                                        placeholder="e.g. Yes, interested in West Africa trade fairs"
                                        value={formData.interestTradeFairs}
                                        onChange={(v) => updateField('interestTradeFairs', v)}
                                    />
                                    <FormInput
                                        label="Import Percentage"
                                        percentage
                                        placeholder="e.g. 30%"
                                        value={formData.importPercentage}
                                        onChange={(v) => updateField('importPercentage', v)}
                                    />
                                </div>

                                <div className="mt-8">
                                    <label className="text-sm font-bold text-gray-700 mb-4 block">Current Memberships in Other Organizations</label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Checkbox
                                            label="Ghana Employers Association (GEA)"
                                            checked={formData.currentGEA}
                                            onChange={(v) => updateField('currentGEA', v)}
                                        />
                                        <Checkbox
                                            label="Ghana National Chamber of Commerce (GNCCI)"
                                            checked={formData.currentGNCCI}
                                            onChange={(v) => updateField('currentGNCCI', v)}
                                        />
                                        <Checkbox
                                            label="FAGE (Federation of Association of Ghanaian Exporters)"
                                            checked={formData.currentFAGE}
                                            onChange={(v) => updateField('currentFAGE', v)}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <FormInput
                                            label="Other Organizations"
                                            placeholder="List any other business associations"
                                            value={formData.currentOther}
                                            onChange={(v) => updateField('currentOther', v)}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Part C - Publication Data */}
                        {(currentSection === 'C') && (
                            <motion.div
                                key="section-c"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-6 md:p-8"
                            >
                                <SectionHeader
                                    title="PART C: Publication Data"
                                    icon={<Factory className="text-red-600" size={24} />}
                                />

                                <div className="mt-6">
                                    <label className="text-sm font-bold text-gray-700 mb-4 block">
                                        Business Activity Sectors * (Select up to 3)
                                    </label>
                                    {errors.selectedSectors && <ErrorMessage msg={errors.selectedSectors} />}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {SECTORS.map(sector => (
                                            <button
                                                key={sector}
                                                type="button"
                                                onClick={() => toggleSector(sector)}
                                                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${formData.selectedSectors.includes(sector)
                                                    ? 'border-red-600 bg-red-50 text-red-700'
                                                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                                                    }`}
                                            >
                                                {formData.selectedSectors.includes(sector) && <Check size={14} className="inline mr-1" />}
                                                {sector}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">{formData.selectedSectors.length} of 3 selected</p>
                                </div>

                                <div className="mt-8">
                                    <FormInput
                                        label="Main Business Area *"
                                        placeholder="Describe your main business activities"
                                        value={formData.mainBusinessArea}
                                        onChange={(v) => updateField('mainBusinessArea', v)}
                                        error={errors.mainBusinessArea}
                                    />
                                </div>

                                <div className="mt-6">
                                    <label className="text-sm font-bold text-gray-700 mb-4 block">
                                        Five Main Products or Services *
                                    </label>
                                    {errors.products && <ErrorMessage msg={errors.products} />}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <ProductInput
                                            number={1}
                                            value={formData.productService1}
                                            onChange={(v) => updateField('productService1', v)}
                                        />
                                        <ProductInput
                                            number={2}
                                            value={formData.productService2}
                                            onChange={(v) => updateField('productService2', v)}
                                        />
                                        <ProductInput
                                            number={3}
                                            value={formData.productService3}
                                            onChange={(v) => updateField('productService3', v)}
                                        />
                                        <ProductInput
                                            number={4}
                                            value={formData.productService4}
                                            onChange={(v) => updateField('productService4', v)}
                                        />
                                        <ProductInput
                                            number={5}
                                            value={formData.productService5}
                                            onChange={(v) => updateField('productService5', v)}
                                        />
                                    </div>
                                </div>

                                {/* Terms and Conditions */}
                                <div className="mt-10 p-6 bg-gray-50 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            id="agreeTerms"
                                            checked={formData.agreeTerms}
                                            onChange={(e) => updateField('agreeTerms', e.target.checked)}
                                            className="mt-1 w-4 h-4 accent-red-600"
                                        />
                                        <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                                            I certify that the information provided in this application is true and accurate.
                                            I agree to abide by the Constitution and Code of Ethics of the Association of Ghana Industries (AGI).
                                            I understand that AGI reserves the right to accept or reject this application.
                                        </label>
                                    </div>
                                    {errors.agreeTerms && <ErrorMessage msg={errors.agreeTerms} />}
                                </div>
                            </motion.div>
                        )}

                        {/* REVIEW SECTION */}
                        {(currentSection === 'review') && (
                            <motion.div
                                key="section-review"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-6 md:p-8"
                            >
                                <SectionHeader
                                    title="Review Your Application"
                                    icon={<FileText className="text-red-600" size={24} />}
                                />

                                <p className="text-gray-500 mt-2 mb-6">Please review all information below before submitting your application.</p>

                                {/* Personal Information Section */}
                                <ReviewSection
                                    title="Personal Information"
                                    icon={<User className="text-red-600" size={20} />}
                                    isExpanded={expandedSections.personal}
                                    onToggle={() => toggleSection('personal')}
                                    onEdit={() => goToEditSection('personal')}
                                >
                                    <ReviewField label="Organization Name" value={formData.organizationName || '-'} />
                                    <ReviewField label="Email Address" value={formData.email || '-'} />
                                    <ReviewField label="Town" value={formData.town || '-'} />
                                    <ReviewField label="Region" value={formData.region || '-'} />
                                    <ReviewField label="CEO Name" value={formData.ceoName ? `${formData.ceoTitle} ${formData.ceoName}` : '-'} />
                                    <ReviewField label="CEO Position" value={formData.ceoPosition || '-'} />
                                    <ReviewField label="CEO Profile" value={formData.ceoProfile ? `${wordCount(formData.ceoProfile)} words` : '-'} />
                                </ReviewSection>

                                {/* Business Details Section */}
                                <ReviewSection
                                    title="Business Details"
                                    icon={<Building2 className="text-red-600" size={20} />}
                                    isExpanded={expandedSections.business}
                                    onToggle={() => toggleSection('business')}
                                    onEdit={() => goToEditSection('business')}
                                >
                                    <ReviewField label="Ownership Type" value={formData.ownershipType || '-'} />
                                    <ReviewField label="Year Began" value={formData.yearOperationsBegan || '-'} />
                                    <ReviewField label="Employees" value={formData.employeeCount || '-'} />
                                    <ReviewField label="Turnover" value={formData.turnover || '-'} />
                                    <ReviewField label="Export Markets" value={formData.exportMarkets || '-'} />
                                    <ReviewField label="Company Profile" value={formData.companyProfile ? `${wordCount(formData.companyProfile)} words` : '-'} />
                                </ReviewSection>

                                {/* Business Activity Section */}
                                <ReviewSection
                                    title="Business Activity"
                                    icon={<Factory className="text-red-600" size={20} />}
                                    isExpanded={expandedSections.activity}
                                    onToggle={() => toggleSection('activity')}
                                    onEdit={() => goToEditSection('activity')}
                                >
                                    <ReviewField label="Business Sectors" value={formData.selectedSectors.length > 0 ? formData.selectedSectors.join(', ') : '-'} />
                                    <ReviewField label="Main Business" value={formData.mainBusinessArea || '-'} />
                                    <ReviewField label="Products/Services" value={[formData.productService1, formData.productService2, formData.productService3, formData.productService4, formData.productService5].filter(p => p).join(', ') || '-'} />
                                </ReviewSection>

                                {/* Documents Section - Shows all uploaded documents */}
                                <ReviewSection
                                    title="Documents"
                                    icon={<FileText className="text-red-600" size={20} />}
                                    isExpanded={expandedSections.documents}
                                    onToggle={() => toggleSection('documents')}
                                    onEdit={() => goToEditSection('personal')}
                                >
                                    {documents.length > 0 ? (
                                        documents.map((doc, idx) => (
                                            <ReviewField
                                                key={doc.id}
                                                label={`Document ${idx + 1}`}
                                                value={`${doc.typeLabel}: ${doc.name}`}
                                                valueClass="text-green-600"
                                            />
                                        ))
                                    ) : (
                                        <ReviewField label="Documents" value="No documents uploaded" valueClass="text-orange-500" />
                                    )}
                                </ReviewSection>

                                {/* Membership Options Section */}
                                <ReviewSection
                                    title="Membership Options"
                                    icon={<Check className="text-red-600" size={20} />}
                                    isExpanded={expandedSections.membership}
                                    onToggle={() => toggleSection('membership')}
                                    onEdit={() => goToEditSection('business')}
                                >
                                    <ReviewField label="Current Memberships" value={getMemberships()} />
                                </ReviewSection>

                                {/* Terms Confirmation */}
                                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center gap-2 text-green-700">
                                        <Check size={20} />
                                        <span className="font-medium">Terms & Conditions Accepted</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="p-6 md:p-8 border-t border-gray-100 flex justify-between items-center bg-gray-50">
                        <button
                            onClick={prevSection}
                            disabled={currentSection === 'A'}
                            className={`flex items-center gap-2 text-sm font-bold transition-colors ${currentSection === 'A' ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            <ArrowLeft size={18} /> Previous
                        </button>
                        <div className="flex gap-4">
                            <button className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100 border border-gray-200 transition-all">
                                <Save size={18} /> Save Draft
                            </button>
                            <button
                                onClick={currentSection === 'review' ? () => setShowConfirm(true) : nextSection}
                                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-red-900/10"
                            >
                                {currentSection === 'review' ? 'Submit Application' : 'Next Section'} <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Contact */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Need assistance? Contact AGI: {AGI_CONTACT.phone} | {AGI_CONTACT.email}</p>
                </div>
            </div>

            {/* Smaller Confirmation Modal */}
            {showConfirm && !showPdfPreview && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-xl max-w-md w-full p-6"
                    >
                        <div className="text-center mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Check className="text-green-600" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Confirm Submission</h3>
                            <p className="text-gray-500 text-sm mt-1">Review and confirm your application</p>
                        </div>

                        <div className="space-y-3 text-sm mb-4">
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-500">Organization:</span>
                                <span className="font-medium text-gray-900">{formData.organizationName}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-500">Email:</span>
                                <span className="font-medium text-gray-900">{formData.email}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-500">Documents:</span>
                                <span className="font-medium text-gray-900">{documents.length} file(s)</span>
                            </div>
                            <div className="flex justify-between pb-2">
                                <span className="text-gray-500">Employees:</span>
                                <span className="font-medium text-gray-900">{formData.employeeCount}</span>
                            </div>
                        </div>

                        {/* Email Notification Info - Testing to kofilartey12@gmail.com */}
                        <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg mb-4">
                            <div className="flex items-start gap-2">
                                <Mail className="text-blue-600 mt-0.5" size={14} />
                                <div className="text-xs">
                                    <p className="font-medium text-blue-900">Confirmation emails will be sent to:</p>
                                    <p className="text-blue-700 mt-1">
                                        1. AGI: {AGI_CONTACT.email}<br />
                                        2. You: kofilartey12@gmail.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={generateAndDownloadPDF}
                                className="flex-1 py-2.5 border border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm"
                            >
                                <Download size={16} /> Download PDF
                            </button>
                            <button
                                onClick={() => setShowPdfPreview(true)}
                                className="flex-1 py-2.5 border border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm"
                            >
                                <Eye size={16} /> Preview
                            </button>
                        </div>

                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 py-2.5 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                            >
                                Go Back
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg font-bold text-white transition-colors flex items-center justify-center gap-2 text-sm"
                            >
                                {isSubmitting ? (
                                    <>Processing...</>
                                ) : (
                                    <>Submit <Check size={16} /></>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* PDF Preview Modal */}
            {showPdfPreview && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 md:p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                    >
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="font-bold text-gray-900">Application Preview</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={generateAndDownloadPDF}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors"
                                >
                                    <Download size={16} /> Download PDF
                                </button>
                                <button
                                    onClick={() => setShowPdfPreview(false)}
                                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>
                        </div>
                        <div className="overflow-y-auto flex-1">
                            <PreviewPDFContent />
                        </div>
                        <div className="p-4 border-t flex gap-2">
                            <button
                                onClick={() => setShowPdfPreview(false)}
                                className="flex-1 py-2.5 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                            >
                                Close Preview
                            </button>
                            <button
                                onClick={() => { setShowPdfPreview(false); handleSubmit(); }}
                                disabled={isSubmitting}
                                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg font-bold text-white transition-colors flex items-center justify-center gap-2 text-sm"
                            >
                                {isSubmitting ? (
                                    <>Processing...</>
                                ) : (
                                    <>Submit Application <Check size={16} /></>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

// Helper Components
const SectionHeader = ({ title, icon, className = '' }) => (
    <div className={`flex items-center gap-3 pb-3 border-b-2 border-red-600 ${className}`}>
        {icon}
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
    </div>
);

const FormInput = ({ label, placeholder, value, onChange, error, type = 'text', percentage }) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-gray-800">{label}</label>
        <div className="relative">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full bg-white border ${error ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition-all text-sm text-slate-900 placeholder:text-gray-500 ${percentage ? 'pr-8' : ''}`}
            />
            {percentage && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            )}
        </div>
        {error && <ErrorMessage msg={error} />}
    </div>
);

const ErrorMessage = ({ msg }) => (
    <p className="text-red-500 text-xs flex items-center gap-1">
        <AlertCircle size={12} /> {msg}
    </p>
);

const Checkbox = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors bg-white">
        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4 accent-red-600"
        />
        <span className="text-sm text-gray-800 font-medium">{label}</span>
    </label>
);

const ProductInput = ({ number, value, onChange }) => (
    <div className="space-y-1">
        <label className="text-xs font-bold text-gray-700">Product/Service {number}</label>
        <input
            type="text"
            placeholder={`Enter product or service ${number}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-white border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition-all text-sm text-slate-900 placeholder:text-gray-500"
        />
    </div>
);

// Review Section Components
const ReviewSection = ({ title, icon, isExpanded, onToggle, onEdit, children }) => (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
        <button
            type="button"
            onClick={onToggle}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
            <div className="flex items-center gap-3">
                {icon}
                <span className="font-bold text-gray-900">{title}</span>
            </div>
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onEdit(); }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700 transition-colors"
                >
                    <Edit2 size={12} /> Edit
                </button>
                {isExpanded ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
            </div>
        </button>
        <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                >
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const ReviewField = ({ label, value, valueClass = 'text-gray-900' }) => (
    <div>
        <p className="text-xs text-gray-600 font-semibold mb-1">{label}</p>
        <p className={`font-medium ${valueClass}`}>{value}</p>
    </div>
);

export default ApplicationPage;
