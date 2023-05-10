import {PSP_RELATIONS} from '../../../taxonomies/index.js';
import {defineRule} from '../../custom/config.js';
import {validatePodTemplate} from '../utils.js';

export const appArmor = defineRule({
  id: 107,
  description: 'Restrict host path volumes.',
  fullDescription: `On supported hosts, the runtime/default AppArmor profile is applied by default. The baseline policy should prevent overriding or disabling the default AppArmor profile, or restrict overrides to an allowed set of profiles.`,
  help: 'Do not customize AppArmor.',
  advanced: {
    relationships: [PSP_RELATIONS['baseline']],
  },
  validate({resources}, {report}) {
    validatePodTemplate(resources, (resource, pod, prefix) => {
      const appArmor = pod.metadata?.annotations?.['container.apparmor.security.beta.kubernetes.io/*'];
      const valid = !appArmor || appArmor === 'runtime/default' || appArmor === 'localhost/*';
      if (valid) return;
      report(resource, {path: `${prefix}.metadata.annotations`});
    });
  },
});
