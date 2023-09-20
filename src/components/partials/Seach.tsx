import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Search = () => {
    const [title, setTitle] = useState('');

    const router = useRouter();

    return (
        <>
            <div>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button onClick={() => router.push(`/result?search=${title}`)}>
                    Search
                </button>
            </div>
        </>
    );
};

export default Search;
