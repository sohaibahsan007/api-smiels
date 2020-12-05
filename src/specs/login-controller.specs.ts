// TODO(jannyHou): This should be moved to @loopback/authentication
export interface TenantInfo {
  name: string;
  logoUrl?: string;
}
export const TenantInfoSchema = {
  type: 'object',
  required: ['tenantId'],
  properties: {
    name: {type: 'string'},
    logoUrl: {type: 'string'},
  },
};
