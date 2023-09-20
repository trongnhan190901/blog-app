import { OutputData } from '@editorjs/editorjs';
import editorJsHtml from 'editorjs-html';
const EditorJsToHtml = editorJsHtml();

type Props = {
    data: OutputData;
};
type ParsedContent = string | JSX.Element;

const EditorJsRenderer = ({ data }: Props) => {
    const html = EditorJsToHtml.parse(data) as ParsedContent[];

    return (
        <div className='prose max-w-full '>
            {html &&
                html.map((item, index) => {
                    if (typeof item === 'string') {
                        return (
                            <div
                                dangerouslySetInnerHTML={{ __html: item }}
                                key={index}
                                className='my-5'
                            ></div>
                        );
                    }
                    return item;
                })}
        </div>
    );
};

export default EditorJsRenderer;
