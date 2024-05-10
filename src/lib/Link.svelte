<script>
  export let href;
  export let text;
  export let open = true;
</script>

<a href={href} target={open ? "_blank" : undefined} rel="noopener noreferrer">
  {text}
</a>
<sub>↗</sub>

