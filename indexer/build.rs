fn main() {
    println!("cargo:rerun-if-changed=proto");
    tonic_build::configure()
        .out_dir("src/pb")
        .compile(&["proto/swift.proto"], &["proto"])
        .expect("Failed to compile Substreams proto(s)");
}
