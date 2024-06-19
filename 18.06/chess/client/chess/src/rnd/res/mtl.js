class _material {
  apply(rnd) {
    if (this.shader.id == null)
      return;
    this.shader.aooly();

    for (let t in this.textures)
      if (this.textures[t] != null)
        this.textures[t].apply(this.shader, t);
  }
}
