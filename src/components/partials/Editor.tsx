//./components/Editor
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { memo, useEffect, useRef } from 'react';
import { EDITOR_TOOLS } from './EditorTools';

type Props = {
    data?: OutputData;
    onChange(val: OutputData): void;
    holder: string;
};

const EditorBlock = ({ data, onChange, holder }: Props) => {
    const ref = useRef<EditorJS>();

    useEffect(() => {
        if (!ref.current) {
            const editor = new EditorJS({
                placeholder: 'Nội dung ở đây...',
                holder: holder,
                tools: EDITOR_TOOLS,
                data: data,
                async onChange(api, event) {
                    const data = await api.saver.save();
                    onChange(data);
                },
            });
            ref.current = editor;
        }

        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy();
            }
        };
    }, []);

    return <div id={holder} />;
};

export default memo(EditorBlock);
