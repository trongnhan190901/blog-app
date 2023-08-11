//./components/Editor
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { memo, useEffect, useRef } from 'react';
import { EDITOR_TOOLS } from './EditorTools';

//props
type Props = {
    data?: OutputData;
    onChange(val: OutputData): void;
    holder: string;
};

const EditorBlock = ({ data, onChange, holder }: Props) => {
    //add a reference to editor
    const ref = useRef<EditorJS>();

    //initialize editorjs
    useEffect(() => {
        //initialize editor if we don't have a reference
        if (!ref.current) {
            const editor = new EditorJS({
                placeholder: 'Nội dung ở đây...',
                holder: holder,
                tools: EDITOR_TOOLS,
                data,
                async onChange(api, event) {
                    const data = await api.saver.save();
                    onChange(data);
                },
            });
            ref.current = editor;
        }

        //add a return function handle cleanup
        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy();
            }
        };
    }, []);

    return <div id={holder} />;
};

export default memo(EditorBlock);
