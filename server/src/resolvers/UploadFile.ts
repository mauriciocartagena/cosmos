import AWS from "aws-sdk";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import stream from "stream";
import "dotenv-safe/config";
import { Arg, Mutation } from "type-graphql";
import { UploadedFileResponse } from "../entities/Upload";

type S3UploadStream = {
  writeStream: stream.PassThrough;
  promise: Promise<AWS.S3.ManagedUpload.SendData>;
};

export class UploadFileResolver {
  s3: AWS.S3;

  constructor() {
    AWS.config = new AWS.Config();
    AWS.config.update({
      region: process.env.AWS_S3_REGION || "ca-central-1",
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    this.s3 = new AWS.S3();
  }
  createUploadStream(key: string, mimeType: string): S3UploadStream {
    const pass = new stream.PassThrough();

    return {
      writeStream: pass,
      promise: this.s3
        .upload({
          Bucket: process.env.AWS_S3_BUCKET,
          ACL: "public-read",
          ContentType: mimeType,
          Key: key,
          Body: pass,
          CacheControl: "max-age:31536000",
          ContentDisposition: "inline",
        })
        .promise(),
    };
  }
  createDestinationFilePath(
    fileName: string,
    mimetype: string,
    encoding: string
  ): string {
    mimetype;
    encoding;
    return fileName;
  }
  @Mutation(() => UploadedFileResponse)
  async singleUpload(
    @Arg("file", () => GraphQLUpload)
    { createReadStream, filename, mimetype, encoding }: FileUpload
  ): Promise<UploadedFileResponse> {
    const filePath = this.createDestinationFilePath(
      filename,
      mimetype,
      encoding
    );

    const uploadStream = this.createUploadStream(filePath, mimetype);

    createReadStream().pipe(uploadStream.writeStream);

    const result = await uploadStream.promise;

    return { filename, mimetype, encoding, url: result.Location };
  }
}
