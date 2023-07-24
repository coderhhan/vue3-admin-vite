export const contentConfig = {
  createBtnText: '添加职位',
  rowkey: 'id',
  border: true,
  isHidePagination: true,
  propsList: [
    {
      label: '名称',
      prop: 'name',
    },
    {
      label: '权限值',
      prop: 'code',
    },
    {
      label: '创建时间',
      prop: 'createTime',
    },
    {
      label: '更新时间',
      prop: 'updateTime',
    },
    {
      label: '操作',
      slot: 'action',
    },
  ],
}
