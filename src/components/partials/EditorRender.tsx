import { OutputData } from '@editorjs/editorjs';
import editorJsHtml from 'editorjs-html';
const EditorJsToHtml = editorJsHtml();

type Props = {
    data: OutputData;
};
type ParsedContent = string | JSX.Element;

const EditorJsRenderer = ({ data }: Props) => {
    const html = EditorJsToHtml.parse(data) as ParsedContent[];

    console.log(data);

    return (
        <div className='prose max-w-full '>
            {html && (
                <div
                    dangerouslySetInnerHTML={{ __html: html }}
                    className='my-5'
                ></div>
            )}
        </div>
    );
};

export default EditorJsRenderer;
