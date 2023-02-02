import {ComponentMeta, ComponentStory} from '@storybook/react';
import ErrorInfo from './ErrorInfo';
import {LocationClickErrorInfoArgs, MainErrorInfoArgs} from './ErrorInfo.stories.args';

export default {
  title: 'Molecules/ErrorInfo',
  component: ErrorInfo,
} as ComponentMeta<typeof ErrorInfo>;

const Template: ComponentStory<typeof ErrorInfo> = args => <ErrorInfo {...args} />;

export const MainErrorInfo = Template.bind({});
MainErrorInfo.args = MainErrorInfoArgs;

export const LocationClickErrorInfo = Template.bind({});
LocationClickErrorInfo.args = LocationClickErrorInfoArgs;