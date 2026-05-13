import React, { useState } from 'react';
import { Stack, TextInput, Button } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import Service from '../../utils/http';
import { RefreshCw } from 'lucide-react';

export const URLShortener = () => {
  const [date, setDate] = useState(null);
  const [data, setData] = useState({
    originalUrl: '',
    customLink: '',
    title: '',
  });

  const [shortUrl, setShortUrl] = useState('');
  const service = new Service();
  const handleSubmit = async () => {
    try {
      const payload = {
        ...data,
        expiryDate: date,
      };

      const response = await service.post('s', payload);
      setShortUrl(response.shortCode);
      console.log(`https://url-shortener-bootcamp.onrender.com/api/s/${response.shortCode}`);
    } catch (error) {
      console.log('Post has failed', error.message);
    }
  };

  return (
    <>
      {shortUrl && shortUrl.length > 0 ? (
        <Stack gap="lg" maw={500} mx="auto">
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              width: '100%', 
              height: '100px', 
              alignItems: 'center' 
            }}
          >
            <p 
              className="mantine-focus-auto m_b6d8b162 mantine-Text-root" 
              style={{ 
                fontSize: 'calc(3.125rem * var(--mantine-scale))', 
                lineHeight: '50px', 
                textShadow: 'rgba(0, 0, 0, 0.69) 2px 2px 10px', 
                fontWeight: 'lighter' 
              }}
            >
              Shorten Your URL Here
            </p>
          </div>

          <h1> Generated Short URL: </h1>
          {`https://url-shortener-bootcamp.onrender.com/api/s/${shortUrl}`}

          <Button
            variant="outline"
            size="md"
            radius="sm"
            onClick={() => setShortUrl('')}
          >
            Generate New URL <RefreshCw style={{ marginLeft: '10px' }} size={18} />
          </Button>
        </Stack>
      ) : (
        <Stack gap="lg" maw={500} mx="auto">
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              width: '100%', 
              height: '100px', 
              alignItems: 'center' 
            }}
          >
            <p 
              className="mantine-focus-auto m_b6d8b162 mantine-Text-root" 
              style={{ 
                fontSize: 'calc(3.125rem * var(--mantine-scale))', 
                lineHeight: '50px', 
                textShadow: 'rgba(0, 0, 0, 0.69) 2px 2px 10px', 
                fontWeight: 'lighter' 
              }}
            >
              Shorten Your URL Here
            </p>
          </div>

          <TextInput
            label="Original URL"
            placeholder="Paste Original URL"
            withAsterisk
            value={data.originalUrl}
            onChange={(event) =>
              setData({
                ...data,
                originalUrl: event.target.value,
              })
            }
          />

          <TextInput
            label="Customize Your Link (Optional)"
            placeholder="Customize Your Link"
            value={data.customLink}
            onChange={(event) =>
              setData({
                ...data,
                customLink: event.target.value,
              })
            }
          />

          <TextInput
            label="Title (Optional)"
            placeholder="Title of URL"
            value={data.title}
            onChange={(event) =>
              setData({
                ...data,
                title: event.target.value,
              })
            }
          />

          <DateInput
            value={date}
            onChange={setDate}
            label="Expiry Date (Optional)"
            placeholder="mm-dd-yyyy"
          />

          <Button variant="outline" onClick={handleSubmit}>
            Shorten URL
          </Button>
        </Stack>
      )}
    </>
  );
};

export default URLShortener;