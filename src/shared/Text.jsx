import Typography from '@mui/material/Typography';

/**
 * Notes in variant 
 * Possible default values : h1, h2, h3, h4, h5, h6, subtitle1, subtitle2, body1, body2, button, caption, overline
 * Possible custom values: bigTitleBold, titleBold, normal
 * 
 */

function Text({variant, children}){
    return <Typography variant={variant}>{children}</Typography>
}

export default Text;