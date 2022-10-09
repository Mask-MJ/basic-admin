<template>
  <div>222</div>
</template>
<script lang="ts" setup>
  import { unref } from 'vue';
  import { useRouter } from 'vue-router';

  const { currentRoute, replace } = useRouter();

  const { params, query } = unref(currentRoute);
  const { path, _redirect_type = 'path' } = params;

  Reflect.deleteProperty(params, '_redirect_type');
  Reflect.deleteProperty(params, 'path');

  const _path = Array.isArray(path) ? path.join('/') : path;
  console.log('222');
  if (_redirect_type === 'name') {
    console.log(_path, query, params);
    replace({ name: _path, query, params });
  } else {
    console.log({ path: _path.startsWith('/') ? _path : '/' + _path, query });
    replace({ path: _path.startsWith('/') ? _path : '/' + _path, query });
  }
</script>
