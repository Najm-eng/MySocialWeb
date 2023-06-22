import { Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const advertUrl = 'https://final-project1.herokuapp.com/'; // Replace with your actual URL

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography
          color={dark}
          variant="h5"
          fontWeight="500"
          sx={{ textAlign: 'center', width: '100%' }}
        >
          My other Project
        </Typography>
      </FlexBetween>
      <a href={advertUrl} target="_blank" rel="noopener noreferrer">
        <img
          width="100%"
          height="auto"
          alt="advert"
          src="http://localhost:3001/assets/shoes3.jpg"
          style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
        />
      </a>
      <FlexBetween>
        <Typography color={main} sx={{ textAlign: 'center', width: '100%' }}>
          O&N Market
        </Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Get ready to turn heads with our fashion-forward clothing line at O&N
        Markte
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
