import { Typography } from '@mui/material';
import React, { FC, useEffect } from 'react';

import { useAlert } from '@/src/modules/app/ui/hooks';
import { Loadable } from '@/src/modules/common/ui/components/Loadable';
import { useTitle } from '@/src/modules/common/ui/hooks';

export const IndexPage: FC = () => {
  const { info } = useAlert();

  useTitle('React Template');

  useEffect(() => {
    info({
      message: 'The app is ready for usage',
      title: 'Welcome',
      open: true,
    });
  }, [info]);

  return (
    <Loadable>
      <Typography
        align="center"
        variant="h2"
      >
        👋
      </Typography>
    </Loadable>
  );
};
