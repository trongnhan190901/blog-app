import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import InlineCode from '@editorjs/inline-code';
import LinkTool from '@editorjs/link';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import SimpleImage from '@editorjs/simple-image';

export const EDITOR_TOOLS = {
    header: {
        class: Header,
        inlineToolbar: true,
        config: {
            levels: [2, 3],
            defaultLevel: 2,
            inlineToolbar: ['link', 'bold', 'italic', 'marker'],
        },
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        config: {
            tagName: 'p',
            inlineToolbar: ['link', 'bold', 'italic', 'marker'],
        },
    },
    link: {
        class: LinkTool,
        inlineToolbar: true,
        config: {
            endpoint: 'http://localhost:5000/api/blog/fetchUrl', // Thêm endpoint để xử lý tạo link
            inlineToolbar: ['link', 'bold', 'italic', 'marker'],
        },
    },
    quote: {
        class: Quote,
        inlineToolbar: true,
        config: {
            inlineToolbar: ['link', 'bold', 'italic', 'marker'],
        },
    },
    list: {
        class: List,
        inlineToolbar: true,
        config: {
            inlineToolbar: ['link', 'bold', 'italic', 'marker'],
        },
    },
    image: {
        class: ImageTool,
        inlineToolbar: true,
        config: {
            endpoints: {
                accept: 'image/*',
                byFile: 'http://localhost:5000/api/blog/upload-image', // Thêm endpoint để xử lý upload ảnh
                byUrl: 'http://localhost:5000/api/blog/fetch-image', // Nếu muốn hỗ trợ upload ảnh từ URL
            },
        },
    },
    marker: Marker,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,
};
